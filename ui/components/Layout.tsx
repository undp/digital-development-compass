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

      <footer className="bg-brand-blue py-16 flex flex-col items-center justify-center text-white">
        <div className="grid lg:grid-cols-2 md:grid-cols-4 gap-2 text-left">
          <div className="ml-10 text-left" >
            <div className="space-y-3">
              <div>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  className="ml-4 flex items-center"
                >
                  <GrCreativeCommons className="mr-1" />
                  <FaCreativeCommonsBy className="mr-1" />
                  United Nations Development Programme
                </a>
                <a
                  href="https://www.undp.org/copyright-terms-use" target="_blank"
                  className="ml-4 flex items-center mt-2 underline"
                >
                  Privacy Policy
                </a>
                <Link href="/disclaimer">
                  <a className="ml-4 flex items-center mt-2 underline">
                  Disclaimer
                  </a>
                </Link>
              </div>
              <div className="ml-4 text-left">
                <p>
                  <a
                    href="https://undp2020cdo.typeform.com/FeedbackDDD"
                    className="underline"
                  >
                    Have any questions or concerns? Let us know.
                  </a>
                </p>
              </div>
              <div className="ml-4 text-left">
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
          <div className="ml-10 text-left flex flex-col justify-start items-center md:items-start">
            <p className="text-xs">
              The designations employed and the presentation of material on this map do not imply the expression of any opinion whatsoever on the part of the Secretariat of the United Nations or UNDP concerning the legal status of any country, territory, city or area or its authorities, or concerning the delimitation of its frontiers or boundaries.<br/><br/>
              References to Kosovo* shall be understood to be in the context of UN Security Council resolution 1244 (1999)
            </p>
          </div>
        </div>  
      </footer>
    </>
  );
};

export default Layout;
