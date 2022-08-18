import { NextSeo } from "next-seo";
import React, { ReactNode } from "react";
import { FaCreativeCommonsBy } from "react-icons/fa";
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
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="flex items-center"
        >
          <GrCreativeCommons className="mr-1" />
          <FaCreativeCommonsBy className="mr-1" />
          United Nations Development Programme
        </a>
        <p className="mt-3">
          <a
            href="https://undp2020cdo.typeform.com/FeedbackDDD"
            className="ml-4 underline"
          >
            Have any questions or concerns? Let us know.
          </a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
