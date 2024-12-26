import React, { useState, useEffect } from "react";
import { prefix } from "../lib/prefix";
//import Image from "next/image";
// import LogoSVG from "../public/undp-logo.svg";

const slides = [
  {
    title: "The Digital Development Compass Gets a Powerful Upgrade!",
    content:
      "We’re excited to unveil major improvements to the Digital Development Compass (DDC), focusing on robustness, reliability, and clarity!",
  },
  {
    title1: "Here's a glimpse of what's new:",
    content:
      "<b>Stronger Foundation:</b> The DDC’s structure now aligns seamlessly with the Digital Transformation Framework, providing a clearer picture of a country’s digital journey.",
  },
  {
    content:
      "<b>Expert Guidance:</b> A dedicated Expert Committee has been established to review data and methodologies, ensuring the highest quality standards.",
  },
  {
    content:
      "<b>Enhanced Data:</b> Data sources have undergone a rigorous cleaning process, with new ones added based on stricter selection criteria. This means you'll find the most reliable and relevant information at your fingertips.",
  },
  {
    content:
      "<b>Solid Methodology:</b> The DDC's methodology has been strengthened by improved scoring and weighting techniques, making it statistically sound and more dependable.",
  },
  {
    content:
      "<b>Elevated User Experience:</b> Enjoy a smoother experience! We've revamped the DDC's visualizations and usability for a more intuitive and informative exploration.",
    content1:
      "We're confident these improvements will make the DDC an even more valuable tool for navigating the ever-evolving digital landscape. Stay tuned for further updates!",
  },
  // Add more slides as needed
];

const PopupMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = slides.length;

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenPopup", "true"); // Store the flag in localStorage
  };

  return (
    <div
      className={`fixed z-50 top-[100px] right-3 sm:right-0 sm:top-25 mt-4 mr-4 ${
        isOpen ? "" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg mx-4 md:mx-0 z-10">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <div
              className="rounded-full bg-blue-100 p-1 flex items-center justify-center"
              style={{ width: "50px", height: "50px" }}
            >
              <img src={`${prefix}/undp-logo.svg`} alt="UNDP Logo" width={40} height={40} />
            </div>
            <h2 className="ml-1 text-lg">Digital Development Compass</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
          >
            <span className="text-2xl">&times;</span>{" "}
            {/* Unicode cross character */}
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold">{slides[currentPage].title}</h1>
          <h1 className="text-lg">{slides[currentPage].title1}</h1>
          <div
            className="text-gray-600 pt-1"
            dangerouslySetInnerHTML={{ __html: slides[currentPage].content }}
          />
          <div
            className="text-gray-600 pt-3"
            dangerouslySetInnerHTML={{
              __html: slides[currentPage].content1 || "",
            }}
          />
        </div>
        <div className="px-4 py-4 sm:px-6 flex justify-between items-center border-t">
          {currentPage === 0 ? (
            <div className="px-10"></div> // Empty div to maintain layout
          ) : (
            <button
              onClick={handleBack}
              className="text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Back
            </button>
          )}
          <span className="text-sm text-gray-600">{`${
            currentPage + 1
          } of ${totalPages}`}</span>
        
          {currentPage === totalPages - 1 ? (
            <div className="px-8"></div> // Empty div to maintain layout
          ) : (
            <button
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
