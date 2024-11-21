import { NextSeo } from "next-seo";
import { ReactNode } from "react";
//import Image from "next/image";
// import { FaCreativeCommonsBy } from "react-icons/fa";
// import { GoMarkGithub } from "react-icons/go";
// import { GrCreativeCommons } from "react-icons/gr";
import { Header } from "./header";
// import Link from "next/link";
import CookieConsent from "./cookie-consent";
//import LogoSVG from "../public/undp-white-logo.svg";
//import xTwitter from '../public/x-twitter-brands-solid.svg'
//import InstagramSVG from '../public/instagram-brands-solid.svg'
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { prefix } from "lib/prefix";
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
      <footer className="footer-background-color text-white">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-[140px] h-[440px] sm:h-[440px] md:h-[435px] lg:h-[333px] pt-[48px] sm:pt-[48px] md:pt-[52px] lg:pt-[52px]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-[32px] sm:pb-[32px] md:pb-[48px] lg:pb-[48px]">
            <div className="flex flex-row items-center space-x-0 mb-0 sm:mb-0 md:mb-4 lg:mb-0">
              <div className="w-[60px] flex-shrink-0 mb-0 sm:mb-0">
                <img src={`${prefix}/undp-white-logo.svg`} width={60}
                 height={123} alt="UNDP Logo" />
              </div>
              <div className="text-xl sm:text-xl md:text-[25px] md:leading-[1.15] sm:pl-4 font-normal md:text-left lg:text-left">
                <span>United Nations</span>
                <br />
                <span>Development Programme</span>
              </div>
            </div>
            <div className="hidden md:block lg:block">
              <div className="flex justify-center space-x-8 mb-6">
                <a
                  href="https://www.facebook.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/undp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://www.instagram.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img height={20} width={20} src={`${prefix}/instagram-brands-solid.svg`} alt="InstagramSVG" />
                </a>
                <a
                  href="https://twitter.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <img height={20} width={20} src={`${prefix}/x-twitter-brands-solid.svg`} alt="xTwitter" />
                </a>
                <a
                  href="https://www.youtube.com/user/undp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#fff] w-full"></div>
          <div className="flex flex-col lg:flex-row justify-between items-start w-full pt-[34px] text-center lg:text-left pb-5 sm:pb-5 md:mb-[24px] lg:mb-[24px] pl-0 sm:pl-4 md:pl-0 lg:pl-0">
            <p className="text-sm md:text-[16px] md:leading-[22px] font-normal lg:order-1 mb-2 lg:mb-0">
              &copy; 2024 United Nations Development Programme
            </p>
            <a
              href="https://www.undp.org/copyright-terms-use"
              className="text-base font-normal order-1 lg:order-2 mb-2 lg:mb-0 opacity-100 hover:opacity-70"
            >
              Terms Of Use
            </a>
          </div>
          <div className="md:hidden lg:hidden ">
            <div className="flex space-x-8 pl-[50px]">
              <a
                href="https://www.facebook.com/UNDP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/undp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                  href="https://www.instagram.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img height={20} width={20} src={`${prefix}/instagram-brands-solid.svg`} alt="InstagramSVG" />
                </a>
                <a
                  href="https://twitter.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <img height={20} width={20} src={`${prefix}/x-twitter-brands-solid.svg`} alt="xTwitter" />
                </a>
              <a
                href="https://www.youtube.com/user/undp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
