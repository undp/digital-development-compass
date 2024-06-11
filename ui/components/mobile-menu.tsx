import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the interface for the props
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  countries: CountryNameAndAlpha[];
}

export function MobileMenu({ isOpen, onClose, countries }: MobileMenuProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null);

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

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Content
          className={`fixed top-20 left-0 h-full w-full custom-mobile-bg-color bg-opacity-90 z-50 space-y-4 shadow-lg transform transition-transform duration-300 translate-x-0 ${
            isOpen ? "custom-mobile-menu" : "custom-mobile-close-menu"
          }`}
          style={{ top: "6rem" }}
        >
          <nav className="flex flex-col w-full justify-center">
            <Link href="/about">
              <a
                className={`uppercase text-lg w-full border-b p-6 h-20 border-white flex items-center ${
                  activeLink === "/about" ? "footer-background-color text-white" : ""
                }`}
                onClick={() => handleLinkClick("/about")}
              >
                About
              </a>
            </Link>
            <Link href="/data">
              <a
                className={`uppercase text-lg w-full border-b h-20 border-white flex items-center p-6 ${
                  activeLink === "/data" ? "footer-background-color text-white" : ""
                }`}
                onClick={() => handleLinkClick("/data")}
              >
                Data
              </a>
            </Link>
            <Link href="/methodology">
              <a
                className={`uppercase text-lg w-full border-b h-20 border-white flex items-center p-6 ${
                  activeLink === "/methodology" ? "footer-background-color text-white" : ""
                }`}
                onClick={() => handleLinkClick("/methodology")}
              >
                Methodology
              </a>
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
