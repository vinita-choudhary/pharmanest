import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import AbstractModel from "@/Model/AbstractModel";
import RegistrationModel from "@/Model/RegistrationModel";
import QRCode from "qrcode";
import { sendEmail } from "@/lib/mailer";
import { uploadQRCodeToFirebase } from "@/lib/firebase";

connect();

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      specialization,
      authorName,
      authorEmail,
      affiliation,
      mobile,
      isWhatsApp,
      coAuthors,
      keywords,
      abstractText,
    } = await req.json();

    // Validation
    if (!title || !specialization || !authorName || !authorEmail || !affiliation || !mobile || !keywords || !abstractText) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if an abstract with this email already exists
    const existingAbstract = await AbstractModel.findOne({ email: authorEmail });
    if (existingAbstract) {
      return NextResponse.json(
        { message: "An abstract with this email already exists" },
        { status: 409 }
      );
    }

    const temporyAbstractCode = await abstractCodeGeneration();
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/abstractForm/${temporyAbstractCode}`;
    const qrCodeBuffer = await QRCode.toBuffer(url);
    const qrCodeUrl = await uploadQRCodeToFirebase(
      qrCodeBuffer,
      `${temporyAbstractCode}.png`
    );

    const abstractData = {
      email: authorEmail,
      whatsappNumber: isWhatsApp ? mobile : "",
      name: authorName,
      affiliation,
      coAuthor: coAuthors || "",
      title,
      subject: specialization,
      abstractText: abstractText, // Store text instead of file URL
      keywords,
      mobile,
      qrCodeUrl,
      temporyAbstractCode,
      articleType: "textBased", // Mark as text-based
    };

    const newAbstract = new AbstractModel(abstractData);
    await newAbstract.save();

    const registration = await RegistrationModel.findOne({ email: authorEmail });
    let updatedAbstract = newAbstract;

    if (registration) {
      registration.abstractSubmitted = true;
      registration.abstractId = newAbstract._id;
      await registration.save();

      if (registration.paymentStatus === "Completed") {
        updatedAbstract = await AbstractModel.findOneAndUpdate(
          { email: authorEmail },
          {
            registrationCompleted: true,
            registrationCode: registration.registrationCode,
          },
          { new: true }
        );
      }
    }

    await sendEmail({
      _id: newAbstract._id,
      emailType: "SUBMITTED",
    });

    return NextResponse.json({
      message: "Abstract submitted successfully",
      abstract: updatedAbstract,
    });
  } catch (error) {
    console.error("Error submitting abstract:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function abstractCodeGeneration(): Promise<string> {
  const opfPrefix = "OPF";
  const year = new Date().getFullYear().toString().slice(-2);

  const lastAbstract = await AbstractModel.findOne().sort({
    temporyAbstractCode: -1,
  });

  let sequenceNumber;
  if (lastAbstract && lastAbstract.temporyAbstractCode) {
    const lastSequence = parseInt(
      lastAbstract.temporyAbstractCode.slice(3, 6),
      10
    );
    sequenceNumber = (lastSequence + 1).toString().padStart(3, "0");
  } else {
    sequenceNumber = "001";
  }

  return `${opfPrefix}${sequenceNumber}${year}`;
}