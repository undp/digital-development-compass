import { NextSeo } from "next-seo";
import { ReactNode } from "react";
import { FaCreativeCommonsBy } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { GrCreativeCommons } from "react-icons/gr";
import { Header } from "./header";

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
        <div className="space-y-3">
          <div>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="flex items-center"
            >
              <GrCreativeCommons className="mr-1" />
              <FaCreativeCommonsBy className="mr-1" />
              United Nations Development Programme
            </a>
          </div>
          <p>
            <a
              href="https://undp2020cdo.typeform.com/FeedbackDDD"
              className="ml-4 underline"
            >
              Have any questions or concerns? Let us know.
            </a>
          </p>
          <div className="text-center">
            <a
              className="hover:underline items-center inline-flex"
              href="https://github.com/undp/digital-development-compass"
            >
              <GoMarkGithub aria-hidden />
              <span className="ml-1 font-semibold">GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
