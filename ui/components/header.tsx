import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchDialog } from "./search-dialog";
import LogoSVG from "../public/undp-logo.svg";
import { MobileMenu } from "./mobile-menu";
import Hamburger from "../public/hamburger.svg";
import Times from "../public/times-blue.svg";

export function SiteName() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col space-y-1">
        <Link href="/" passHref>
          <a>
            <h1
              className="text-sm font-semibold lg:text-xl max-w-[20ch] sm:max-w-[10ch] lg:max-w-full"
              style={{ color: "#333333" }}
            >
              Digital Development Compass
            </h1>
          </a>
        </Link>
      </div>
    </div>
  );
}

export function Header(props: { countries: CountryNameAndAlpha[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  //const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { countries } = props;

  const handleMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };

  // const handleDropdownOpen = () => {
  //   if (dropdownTimeoutRef.current) {
  //     clearTimeout(dropdownTimeoutRef.current);
  //   }
  //   setDropdownOpen(true);
  // };

  // const handleDropdownClose = () => {
  //   dropdownTimeoutRef.current = setTimeout(() => {
  //     setDropdownOpen(false);
  //   }, 300); // Adjust the delay as needed
  // };

  return (
    <>
      <header className="bg-white flex-shrink-0 border-b">
        {/* mobile */}
        <div className="lg:hidden p-4 flex items-center justify-between h-24">
          <div className="flex items-center space-x-4">
            <div className="w-12">
              <Link href="/">
                <a className="block relative">
                  <Image src={LogoSVG} alt="UNDP Logo" />
                </a>
              </Link>
            </div>
            <SiteName />
          </div>
          <div className="flex items-start">
            <button
              onClick={() => handleMenuToggle(!mobileMenuOpen)}
              className={`bg-white font-semibold border-brand-blue hover:bg-brand-blue/10 px-4 py-4 text-brand-blue-dark flex-shrink-0 flex items-center`}
            >
              <span className="tracking-wide">
                {mobileMenuOpen ? (
                  <Image src={Times} alt="Close menu icon" />
                ) : (
                  <Image src={Hamburger} alt="Open menu icon" />
                )}
              </span>
            </button>
            <div className="flex items-center justify-end">
              <SearchDialog countries={countries} isOpen={mobileMenuOpen} />
            </div>
          </div>
        </div>

        {/* web */}
        <div className="hidden mx-auto px-6 lg:flex lg:items-center lg:justify-between lg:space-x-4">
          <div className="flex items-center">
            <div className="w-12 h-24 flex-shrink-0">
              <Link href="/">
                <a className="block relative">
                  <Image src={LogoSVG} alt="UNDP Logo" />
                </a>
              </Link>
            </div>
            <div className="pl-4 w-4">
              <SiteName />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-14">
            <Link href="/about">
              <a className="uppercase text-sm hover:text-brand-blue-dark font-medium tracking-wider">
                About
              </a>
            </Link>
            <Link href="/data">
              <a className="uppercase text-sm hover:text-brand-blue-dark font-medium tracking-wider">
                Data
              </a>
            </Link>
            <Link href="/methodology">
              <a className="uppercase text-sm hover:text-brand-blue-dark font-medium tracking-wider">
              Methodology   
              </a>
            </Link>
            {/* <div
              className="relative"
              onMouseEnter={handleDropdownOpen}
              onMouseLeave={handleDropdownClose}
            >
              <button className="uppercase text-sm hover:text-brand-blue-dark font-medium tracking-wider flex items-center">
                Methodology
              </button>
              {dropdownOpen && (
                <div
                  className="absolute bg-white border mt-2 rounded shadow-lg w-full z-20" // Ensure the z-index is higher than the data grid
                  onMouseEnter={handleDropdownOpen}
                  onMouseLeave={handleDropdownClose}
                  style={{ width: "280px" }}
                >
                  <Link href="/methodology/digital-development-compass">
                    <a className="px-4 z-30 bg-white py-2 h-20 items-center flex justify-start hover:footer-background-color hover:text-white text-sm uppercase font-medium tracking-wider border-b whitespace-nowrap">
                      Digital Development Compass
                    </a>
                  </Link>
                  <Link href="/methodology/digital-rights-dashboard">
                    <a className="px-4 z-30 py-2 h-20 flex items-center justify-start hover:footer-background-color hover:text-white text-sm uppercase font-medium tracking-wider whitespace-nowrap">
                      Digital Rights Dashboard
                    </a>
                  </Link>
                </div>
              )}
            </div> */}
          </div>
          <div className="flex items-center justify-end pr-8">
            <SearchDialog countries={countries} />
          </div>
        </div>
      </header>
      <MobileMenu
        countries={countries}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
