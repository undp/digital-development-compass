import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import Image from "next/image";
// import { FaCreativeCommonsBy } from "react-icons/fa";
// import { GoMarkGithub } from "react-icons/go";
// import { GrCreativeCommons } from "react-icons/gr";
import { Header } from "./header";
// import Link from "next/link";
import CookieConsent from "./cookie-consent";
import LogoSVG from "../public/undp-white-logo.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
type Props = {
  children?: ReactNode;
  title?: string;
  countries: CountryNameAndAlpha[];
};

const Layout = ({ children, title = "", countries = [] }: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <Header key={title} countries={countries} />
      <main className="flex-shrink-0 main">{children}</main>
      <CookieConsent />
      {/* <footer className="bg-brand-blue text-white py-16 flex flex-col items-center justify-center">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-2 text-left max-w-screen-2xl mx-auto px-10">
          <div className="text-left" >
            <div className="space-y-3">
              <div>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                   className="flex items-center">
                  <div className="flex flex-wrap text-lg">
                    <GrCreativeCommons className="mr-1 my-1" />
                    <FaCreativeCommonsBy className="mr-1 my-1" />
                  </div>
                  United Nations Development Programme
                </a>
                <div className="flex gap-4">
                  <a href="https://www.undp.org/copyright-terms-use" target="_blank"
                    className="flex items-center mt-2 underline">
                    Privacy Policy
                  </a>
                  <Link href="/disclaimer">
                    <a className="flex items-center mt-2 underline">
                      Disclaimer
                    </a>
                  </Link>
                </div>
              </div>
              <div className="text-left">
                <p>
                  <a
                    href="https://undp2020cdo.typeform.com/FeedbackDDD"
                    className="underline"
                  >
                    Have any questions or concerns? Let us know.
                  </a>
                </p>
              </div>
              <div className="text-left">
                <a
                  className="hover:underline items-center inline-flex"
                  href="https://github.com/undp/digital-development-compass"
                >
                  <GoMarkGithub aria-hidden />
                  <span className="ml-1 font-semibold">GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:text-right flex flex-col justify-start items-center md:items-start border-t md:border-t-0 md:mt-0 md:pt-0 pt-5 mt-5">
            <p className="text-sm text-justify">
              The designations employed and the presentation of material on this map do not imply the expression of any opinion whatsoever on the part of the Secretariat of the United Nations or UNDP concerning the legal status of any country, territory, city or area or its authorities, or concerning the delimitation of its frontiers or boundaries.<br /><br />
              References to Kosovo* shall be understood to be in the context of UN Security Council resolution 1244 (1999)
            </p>
          </div>
        </div>  
      </footer> */}
      <footer className="footer-background-color text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 mb-4 lg:mb-0">
              <div className="w-12 flex-shrink-0 mb-2 lg:mb-0">
                <Image src={LogoSVG} alt="UNDP Logo" />
              </div>
              <div className="text-lg leading-tight text-center lg:text-left">
                <span>United Nations</span>
                <br />
                <span>Development Programme</span>
              </div>
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/UNDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com/UNDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/UNDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/undp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://www.youtube.com/user/undp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 w-full mt-6"></div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-4 px-0 text-center lg:text-left">
            <p className="text-sm order-2 lg:order-1 mb-2 lg:mb-0">
              &copy; 2024 United Nations Development Programme
            </p>
            <a
              href="https://www.undp.org/copyright-terms-use"
              className="text-sm order-1 lg:order-2 mb-2 lg:mb-0 hover:underline"
            >
              Terms Of Use
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
