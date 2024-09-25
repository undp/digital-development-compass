import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import chevronRight from "../public/chevron-right.svg";
import arrowLeft from "../public/arrow-left.svg";

// Define the interface for the props
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryNameAndAlpha[];
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isSideViewOpen, setIsSideViewOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 994 && isOpen) {
        onClose();
      }
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Check once on initial render
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const openMethodology = () => {
    setIsSideViewOpen(true);
  };

  const closeSideView = () => {
    setIsSideViewOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content
          className={`fixed top-24 left-0 h-full w-full custom-mobile-bg-color bg-opacity-90 z-50 space-y-4 shadow-lg transform transition-transform duration-300 translate-x-0 ${
            isOpen ? "custom-mobile-menu" : "custom-mobile-close-menu"
          }`}
          style={{ top: "6rem" }}
        >
          {isSideViewOpen ? (
            <MobileMenuSideView onClose={closeSideView} />
          ) : (
            <nav className="flex flex-col w-full justify-center">
              <Link href="/about">
                <a
                  className={`uppercase text-lg w-full border-b p-6 h-20 border-white flex items-center ${
                    activeLink === "/about"
                      ? "footer-background-color text-white"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/about")}
                >
                  About
                </a>
              </Link>
              <Link href="/data">
                <a
                  className={`uppercase text-lg w-full border-b h-20 border-white flex items-center p-6 ${
                    activeLink === "/data"
                      ? "footer-background-color text-white"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("/data")}
                >
                  Data
                </a>
              </Link>
              <a
                className={`uppercase text-lg w-full border-b h-20 border-white flex items-center justify-between p-6 ${
                  activeLink === "/methodology"
                    ? "footer-background-color text-white"
                    : ""
                }`}
                onClick={openMethodology}
              >
                Methodology
                <div className="flex-shrink-0 sm:mt-1">
                  <Image src={chevronRight} alt="chevronRight" />
                </div>
              </a>
            </nav>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface MobileMenuSideViewProps {
  onClose: () => void;
}

export function MobileMenuSideView({ onClose }: MobileMenuSideViewProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 600); // Wait for the animation to finish
  };

  return (
    <div
      className={`fixed left-0 h-full w-full MobileMenuSideMenu bg-opacity-90 z-50 space-y-4 shadow-lg transform transition-transform duration-300 ${
        isVisible ? "custom-side-view" : "custom-side-view-close"
      }`}
    >
      <div
        className="p-4 pl-5 flex items-center cursor-pointer"
        onClick={handleClose}
      >
        <Image src={arrowLeft} alt="arrowLeft" className="mr-2" />
        <span className="text-lg ml-2">Back</span>
      </div>
      <div className="p-4 pt-0 pl-5">
        <h2 className="text-xl font-semibold mb-4 uppercase">Digital Guides</h2>
        <ul className="space-y-4">
          <Link href="/methodology/digital-development-compass">
            <a
              className={`uppercase text-base w-full border-b p-6 h-10 border-white flex items-center
                  }`}
            >
              Digital Development Compass
            </a>
          </Link>
          <Link href="/methodology/digital-rights-dashboard">
            <a
              className={`uppercase text-base w-full border-b h-10 border-white flex items-center p-6 `}
            >
              Digital Rights Dashboard
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
