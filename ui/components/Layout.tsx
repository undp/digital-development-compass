import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { FaCreativeCommonsBy } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { GrCreativeCommons } from "react-icons/gr";
import { Header } from "./header";
import Link from "next/link";
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

      <footer className="bg-brand-blue text-white py-16 flex flex-col items-center justify-center">
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
      </footer>
    </>
  );
};

export default Layout;
