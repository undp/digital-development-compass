import React, { useState, useEffect } from "react";

const PopupMessage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [rectWidth, setRectWidth] = useState(0); // Initial width of the rectangle

  useEffect(() => {
    // Start the animation as soon as the component mounts
    const widthInterval = setInterval(() => {
      setRectWidth((currentWidth) => {
        // Increase width by 10% each second, up to 100%
        const newWidth = currentWidth + 10;
        if (newWidth > 100) {
          clearInterval(widthInterval); // Clear interval once 100% is reached
          return 100;
        }
        return newWidth;
      });
    }, 1000); // Increase width every second

    // Set a timer to close the popup after 10 seconds
    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 10000);

    // Cleanup function to clear the timers
    return () => {
      clearInterval(widthInterval);
      clearTimeout(closeTimer);
    };
  }, []);

  // Style for the rectangle
  const rectStyle = {
    width: `${rectWidth}%`, // Current width in percentage
    height: "3px", // Height of the rectangle (can be changed as desired)
    backgroundColor: "rgb(91 146 229 / var(--tw-bg-opacity))", // Color of the rectangle
    transition: "bg-brand-blue", // Smooth width transition
  };

  return (
    <div
      className={`fixed z-50 top-20 right-3 sm:right-0 sm:top-25 mt-4 mr-4 ${
        isOpen ? "" : "hidden"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Popup card */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-auto max-w-3xl">
        {" "}
        {/* Adjust the max-width as needed */}
        <div className="px-4 py-2 sm:px-4 sm:py-1 sm:flex sm:flex-row-reverse">
          {" "}
          {/* Adjust padding for decreasing height */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center bg-transparent border-0 p-0 text-base font-medium text-cyan-500 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-sm"
            aria-label="Close"
          >
            <span>&times;</span> {/* This is a Unicode cross character */}
          </button>
        </div>
        <div className="p-4">
          {" "}
          {/* Adjust padding for decreasing height */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            The Digital Development Compass Gets a Powerful Upgrade!
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            We're excited to unveil major improvements to the Digital
            Development Compass (DDC), focusing on robustness, reliability, and
            clarity!
            <br />
            <br />
            Here's a glimpse of what's new:
            <ul className="list-disc pl-5 text-sm">
              <li>
                <strong>Stronger Foundation:</strong> The DDC's structure now
                aligns seamlessly with the Digital Transformation Framework,
                providing a clearer picture of a country's digital journey.
              </li>
              <li>
                <strong>Expert Guidance:</strong> A dedicated Expert Committee
                has been established to review data and methodologies, ensuring
                the highest quality standards.
              </li>
              <li>
                <strong>Enhanced Data:</strong> Data sources have undergone a
                rigorous cleaning process, with new ones added based on stricter
                selection criteria. This means you'll find the most reliable and
                relevant information at your fingertips.
              </li>
              <li>
                <strong>Solid Methodology:</strong> The DDC's methodology has
                been strengthened by improved scoring and weighting techniques,
                making it statistically sound and more dependable.
              </li>
              <li>
                <strong>Elevated User Experience:</strong> Enjoy a smoother
                experience! We've revamped the DDC's visualizations and
                usability for a more intuitive and informative exploration.
              </li>
            </ul>
            We're confident these improvements will make the DDC an even more
            valuable tool for navigating the ever-evolving digital landscape.
            <br />
            <br />
            Stay tuned for further updates!
          </div>
        </div>
        <div style={rectStyle} />
      </div>
    </div>
  );
};

export default PopupMessage;
