import { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="max-w-[calc(100%-250px)]"> {/* Adjust max-width accordingly */}
                <p>We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept All”, you consent to the use of ALL the cookies. However, you may visit "Cookie Settings" to provide a controlled consent.</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={handleAccept} className="bg-brand-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Accept All
                </button>
                <a href="/cookie-settings" className="text-blue-200 hover:text-blue-400">
                    Cookie Settings
                </a>
            </div>
        </div>
    );
};

export default CookieConsent;