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
import xTwitter from '../public/x-twitter-brands-solid.svg'
import InstagramSVG from '../public/instagram-brands-solid.svg'
import {
  FaFacebookF,
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
      <footer className="footer-background-color text-white">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-[140px] h-[333px] pt-[52px] ">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-[48px]">
            <div className="flex flex-row items-center space-x-0 mb-4 lg:mb-0">
              <div className="w-[60px] flex-shrink-0 mb-2 lg:mb-0">
                <Image src={LogoSVG} alt="UNDP Logo" />
              </div>
              <div className="text-base sm:text-base md:text-[25px] md:[line-height:28.55px] sm:pl-4 font-normal md:text-center lg:text-left">
                <span>United Nations</span>
                <br />
                <span>Development Programme</span>
              </div>
            </div>
            <div className="hidden md:block lg:block">
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/undp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://www.instagram.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image height={24} width={24} src={InstagramSVG} alt="InstagramSVG" />
                </a>
                <a
                  href="https://twitter.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <Image height={24} width={24} src={xTwitter} alt="xTwitter" />
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
          </div>
          <div className="border-t border-white w-full"></div>
          <div className="flex flex-col lg:flex-row justify-between items-start w-full pt-[32px] text-center lg:text-left pb-[48px]">
            <p className="text-base md:text-[16px] md:[line-height:22px]  font-normal lg:order-1 mb-2 lg:mb-0">
              &copy; 2024 United Nations Development Programme
            </p>
            <a
              href="https://www.undp.org/copyright-terms-use"
              className="text-base font-normal order-1 lg:order-2 mb-2 lg:mb-0 hover:underline"
            >
              Terms Of Use
            </a>
          </div>
          <div className="md:hidden lg:hidden">
            <div className="flex space-x-5 py-5">
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
                  <Image height={20} width={20} src={InstagramSVG} alt="InstagramSVG" />
                </a>
                <a
                  href="https://twitter.com/UNDP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <Image height={20} width={20} src={xTwitter} alt="xTwitter" />
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
