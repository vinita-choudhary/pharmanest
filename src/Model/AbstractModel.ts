import { Schema, model, models } from "mongoose";

const abstractSchema = new Schema({
  email: { type: String, required: true, unique: true },
  whatsappNumber: { type: String },
  name: { type: String },
  affiliation: { type: String },
  coAuthor: { type: String },
  designation: { type: String },
  title: { type: String },
  subject: { type: String },
  abstractFileUrl: { type: String }, // For file-based submissions
  abstractText: { type: String }, // For text-based submissions
  keywords: { type: String }, // Add keywords field
  mobile: { type: String }, // Add mobile field
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  qrCodeUrl: { type: String },
  temporyAbstractCode: { type: String },
  AbstractCode: { type: String },
  rejectionComment: { type: String },
  Status: { type: String, default: "InReview" },
  registrationCompleted: { type: Boolean, default: false },
  registrationCode: { type: String },
  articleType: { type: String },
  presentationType: {
    type: String,
    enum: ["Oral", "E-Poster"],
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AbstractModel = models.Abstract || model("Abstract", abstractSchema);

export default AbstractModel;