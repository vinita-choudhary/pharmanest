"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { subjectOptions } from "./subjectOptions";

export default function AbstractFormPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get form data
      const formData = new FormData(e.target as HTMLFormElement);
      
      const submitData = {
        title: formData.get('title') as string,
        specialization: formData.get('specialization') as string,
        authorName: formData.get('author-name') as string,
        authorEmail: formData.get('author-email') as string,
        affiliation: formData.get('affiliation') as string,
        mobile: formData.get('mobile') as string,
        isWhatsApp: formData.get('isWhatsApp') === 'on',
        coAuthors: formData.get('co-authors') as string,
        keywords: formData.get('keywords') as string,
        abstractText: formData.get('abstract-text') as string,
      };

      const response = await fetch('/api/submitTextAbstract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        alert(result.message || 'Failed to submit abstract');
      }
    } catch (error) {
      console.error('Error submitting abstract:', error);
      alert('Failed to submit abstract. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#070B39] bg-opacity-90 relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-gradient-to-r from-[#FF3366] to-[#FF9966] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-[#9900FF] to-[#FF66CC] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="backdrop-blur-lg bg-[#070B39]/90 border border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-2xl font-bold">
              Important Instructions for Abstract Submission
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription className="text-sm text-gray-300">
              Welcome to the National Conference Abstract Submission portal.
              Before proceeding, please carefully read the following
              instructions:
            </DialogDescription>

            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
              <li>
                Abstracts must be original and not previously published or
                presented.
              </li>
              <li>Abstract length should be between 250-300 words.</li>
              <li>
                Include 3-5 keywords that best represent your research topic.
              </li>
              <li>
                All submissions will undergo double-blind peer review process.
              </li>
              <li>
                Notification of acceptance will be sent within 2-3 weeks after
                submission.
              </li>
              <li>
                Presenting author must register for the conference to present
                the accepted abstract.
              </li>
            </ol>

            <div className="pt-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] text-[#070B39] font-semibold hover:shadow-[0_0_20px_rgba(0,204,255,0.5)] transition-all duration-300"
              >
                I Understand, Proceed to Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
            Abstract Submission
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto">
          Submit your research abstract for the National Conference. All
          submissions will be reviewed by our committee of experts.
        </p>

        {!isFormSubmitted ? (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_0_30px_rgba(0,204,255,0.1)]">
            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
              Submission Guidelines
            </h2>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Areas of Specialization
                </h3>
                <ul className="list-disc text-gray-300 ml-5 space-y-2">
                  {subjectOptions.map((option) => (
                    <li key={option.value}>{option.label}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Abstract Content Guidelines
                </h3>
                <ul className="list-disc text-gray-300 ml-5 space-y-2">
                  <li>
                    <strong className="text-white">
                      Background/Introduction:
                    </strong>{" "}
                    Brief context and significance of the study
                  </li>
                  <li>
                    <strong className="text-white">Objectives:</strong> Clear
                    statement of research aims
                  </li>
                  <li>
                    <strong className="text-white">Methods:</strong> Concise
                    description of methodology
                  </li>
                  <li>
                    <strong className="text-white">Results:</strong> Summary of
                    key findings
                  </li>
                  <li>
                    <strong className="text-white">Conclusion:</strong> Main
                    implications of the research
                  </li>
                  <li>
                    <strong className="text-white">Keywords:</strong> 3-5
                    relevant terms
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Submission Instructions
                </h3>
                <ul className="list-disc text-gray-300 ml-5 space-y-2">
                  <li>
                    Complete all required fields in the submission form below
                  </li>
                  <li>Abstract text should be between 250-300 words</li>
                  <li>Format: Times New Roman, 12-point font, single-spaced</li>
                  <li>
                    Include all authors and their affiliations in the correct
                    order
                  </li>
                  <li>Indicate the preferred presentation format</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Review Process
                </h3>
                <p className="text-gray-300">
                  All submissions will undergo a double-blind peer review by the
                  Scientific Committee. Abstracts will be evaluated based on
                  originality, methodology, relevance, scientific value, and
                  adherence to the submission guidelines. Notification of
                  acceptance will be sent via register email.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Presentation Guidelines
                </h3>
                <p className="text-gray-300 mb-4">
                  Accepted abstracts will be scheduled for either oral or poster
                  presentations:
                </p>
                <ul className="list-disc text-gray-300 ml-5 space-y-2">
                  <li>
                    <strong className="text-white">Oral Presentations:</strong>{" "}
                    8-minute presentation followed by 2-3-minute Q&A
                  </li>
                  <li>
                    <strong className="text-white">
                      Poster Presentations:
                    </strong>{" "}
                    Standard size height 4 Feet X Width 3 Feet in portrait
                    orientation, further Guideline we will share the along with
                    Acceptane mail
                  </li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF]">
                Abstract Submission Form
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-white font-medium"
                  >
                    Abstract Title <span className="text-[#FF3366]">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter the title of your abstract"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="specialization"
                    className="block text-white font-medium"
                  >
                    Area of Specialization{" "}
                    <span className="text-[#FF3366]">*</span>
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  >
                    <option value="" className="bg-[#070B39]">
                      Select an area
                    </option>
                    {subjectOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-[#070B39]"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="author-name"
                    className="block text-white font-medium"
                  >
                    Presenting Author Name{" "}
                    <span className="text-[#FF3366]">*</span>
                  </label>
                  <input
                    type="text"
                    id="author-name"
                    name="author-name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="author-email"
                    className="block text-white font-medium"
                  >
                    Presenting Author Email{" "}
                    <span className="text-[#FF3366]">*</span>
                  </label>
                  <input
                    type="email"
                    id="author-email"
                    name="author-email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="affiliation"
                    className="block text-white font-medium"
                  >
                    Institution/Affiliation{" "}
                    <span className="text-[#FF3366]">*</span>
                  </label>
                  <input
                    type="text"
                    id="affiliation"
                    name="affiliation"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter your institution or affiliation"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="mobile"
                    className="block text-white font-medium"
                  >
                    Mobile Number <span className="text-[#FF3366]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2 flex items-center">
                  <div className="flex items-center h-full pt-8">
                    <input
                      type="checkbox"
                      id="isWhatsApp"
                      name="isWhatsApp"
                      className="h-5 w-5 rounded border-gray-300 text-[#00FFCC] focus:ring-[#00FFCC]"
                    />
                    <label
                      htmlFor="isWhatsApp"
                      className="ml-2 block text-white"
                    >
                      This is also my WhatsApp number
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="co-authors"
                  className="block text-white font-medium"
                >
                  Co-Authors (if any)
                </label>
                <input
                  type="text"
                  id="co-authors"
                  name="co-authors"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  placeholder="Format: Name (Affiliation), Name (Affiliation)"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="keywords"
                  className="block text-white font-medium"
                >
                  Keywords <span className="text-[#FF3366]">*</span>
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  placeholder="3-5 keywords separated by commas"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="abstract-text"
                  className="block text-white font-medium"
                >
                  Abstract Text <span className="text-[#FF3366]">*</span>
                </label>
                <textarea
                  id="abstract-text"
                  name="abstract-text"
                  required
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#00FFCC] focus:ring-1 focus:ring-[#00FFCC] focus:outline-none backdrop-blur-sm"
                  placeholder="Enter your abstract text (250-300 words). Include background, objectives, methods, results, and conclusion."
                ></textarea>
                <p className="text-sm text-gray-400">
                  Word count: 250-300 words recommended
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="confirmation"
                    required
                    className="rounded border-white/20 text-[#00CCFF] focus:ring-[#00CCFF]"
                  />
                  <span className="text-white">
                    I confirm that this abstract is original and has not been
                    previously published or presented{" "}
                    <span className="text-[#FF3366]">*</span>
                  </span>
                </label>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] hover:shadow-[0_0_30px_rgba(0,204,255,0.5)]'
                  } text-[#070B39]`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Abstract'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 text-center shadow-[0_0_30px_rgba(0,204,255,0.1)]">
            <div className="w-20 h-20 bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#070B39]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#00CCFF] mb-4">
              Abstract Submitted Successfully!
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Thank you for your submission. Your abstract will be reviewed by
              our committee, and you will be notified about its status within
              2-3 weeks.
            </p>
            <button
              onClick={() => setIsFormSubmitted(false)}
              className="px-6 py-3 border border-[#00CCFF] text-[#00CCFF] rounded-full hover:bg-[#00CCFF]/10 transition-colors"
            >
              Submit Another Abstract
            </button>
          </div>
        )}
      </div>
    </div>
  );
}