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
  // const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isSideViewOpen, setIsSideViewOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

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

  // const handleLinkClick = (link: string) => {
  //   setActiveLink(link);
  // };

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
          className={`fixed top-24 left-0 h-full w-full custom-mobile-bg-color z-50 space-y-4 shadow-lg transform transition-transform duration-300 translate-x-0 ${
            isOpen ? "custom-mobile-menu" : "custom-mobile-close-menu"
          }`}
          style={{ top: "75px" }}
        >
          {isSideViewOpen ? (
            <MobileMenuSideView onClose={closeSideView} />
          ) : (
            <nav className="flex flex-col w-full justify-center space-y-9 pt-[90px] px-6 ">
              <Link href="/about">
                <a
                  className={`uppercase text-base w-full border-white font-bold flex items-center tracking-extra-tight`}
                  // onClick={() => handleLinkClick("/about")}
                >
                  About
                </a>
              </Link>
              <Link href="/data">
                <a
                  className={`uppercase text-base w-full flex font-bold items-center tracking-extra-tight`}
                  // onClick={() => handleLinkClick("/data")}
                >
                  Data
                </a>
              </Link>
              {process.env.SITE_CONFIG === "dev" ? (
                <a
                  className={`uppercase text-base w-full flex items-center font-bold tracking-extra-tight`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={openMethodology}
                >
                  Methodology
                  <div
                    className={`sm:mt-1 w-full ml-0 pt-[2px] duration-[150ms] ease-linear transform pl-3 ${
                      isHovered ? "translate-x-2" : "translate-x-0"
                    }`}
                  >
                    <Image src={chevronRight} alt="chevronRight" />
                  </div>
                </a>
              ) : (
                <Link href="/methodology">
                  <a
                    className={`uppercase text-base w-full flex font-bold items-center tracking-extra-tight`}
                    // onClick={() => handleLinkClick("/data")}
                  >
                    Methodology
                  </a>
                </Link>
              )}
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
      className={`fixed left-0 h-full w-full MobileMenuSideMenu bg-opacity-90 z-50 shadow-lg transform transition-transform duration-300 px-6 ${
        isVisible ? "custom-side-view" : "custom-side-view-close"
      }`}
    >
      <div
        className="flex items-center cursor-pointer pt-[33px]"
        onClick={handleClose}
      >
        <Image src={arrowLeft} alt="arrowLeft" className="mr-2" />
        <span className="text-sm ml-[7px] uppercase">Back</span>
      </div>
      <div className="pt-0">
        <h2 className="text-base pb-9 pt-[41px] tracking-extra-tight font-bold uppercase">
          Digital Guides
        </h2>
        <ul className="space-y-6">
          <Link href="/methodology/digital-development-compass">
            <a
              className={`text-base w-full flex items-center
                  }`}
            >
              Digital Development Compass
            </a>
          </Link>
          <Link href="/methodology/digital-rights-dashboard">
            <a className={`text-base w-full flex items-center`}>
              Digital Rights Dashboard
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
