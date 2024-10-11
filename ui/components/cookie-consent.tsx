import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 cookie-bg-color text-white p-4 flex flex-col md:flex-row justify-between items-center z-50">
      <div className="max-w-full md:max-w-[calc(100%-250px)] space-y-4 md:space-y-0">
        <p>
          We use cookies on our website to give you the most relevant experience
          by remembering your preferences and repeat visits. By clicking “Accept
          All”, you consent to the use of ALL the cookies. However, you may
          visit "Cookie Settings" to provide a controlled consent.
        </p>
      </div>
      <div className="flex flex-wrap items-center space-x-2 mt-4 md:mt-0">
        <button
          onClick={handleAccept}
          className="bg-white hover:bg-brand-blue text-brand-blue-dark hover:text-white font-semibold py-2 px-4 rounded"
        >
          Accept All
        </button>
        <a href="https://www.undp.org/copyright-terms-use" target="_blank">
          Cookie Settings
        </a>
      </div>
    </div>
  );
};

export default CookieConsent;
