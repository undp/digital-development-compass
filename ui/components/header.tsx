import Image from "next/image";
import Link from "next/link";

import { SearchDialog } from "./search-dialog";
import LogoSVG from "../public/undp-logo.svg";

import { MobileMenu } from "./mobile-menu";
import { useState } from "react";

export function SiteName() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col space-y-1">
      <h1 className="text-sm font-bold lg:text-xl max-w-[20ch] lg:max-w-full">
          Digital Development Compass
        </h1>
      </div>
    </div>
  );
}

export function Header(props: { countries: CountryNameAndAlpha[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { countries } = props;

  const handleMenuToggle = () => {
    setMobileMenuOpen((curr) => !curr);
  };

  return (
    <>
      <header className="bg-white flex-shrink-0 border-b">
        <div className="lg:hidden p-4 flex items-center justify-between h-28">
          <div className="flex items-center space-x-4">
            <div className="w-9">
              <Link href="/">
                <a className="block relative">
                  <Image src={LogoSVG} alt="UNDP Logo" />
                </a>
              </Link>
            </div>
            <SiteName />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleMenuToggle}
              className="bg-white border-2 font-semibold border-brand-blue hover:bg-brand-blue/10 px-4 py-2 text-brand-blue-dark flex-shrink-0 flex items-center"
            >
              <span className="text-xs uppercase tracking-wide">
                {mobileMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
        <div className="hidden mx-auto px-6 lg:grid grid-cols-3">
          <SiteName />
          <div className="flex justify-center items-center">
            <Link href="/">
              <a className="block w-[203px]">
                <Image
                  src="/undp-logo.svg"
                  height={49.27}
                  width={100}
                  layout="responsive"
                  alt="UNDP Logo"
                />
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-8">
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
