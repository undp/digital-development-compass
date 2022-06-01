import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FaCreativeCommonsBy } from "react-icons/fa";
import { GrCreativeCommons } from "react-icons/gr";
import { SearchDialog } from "./search-dialog";

type Props = {
  children?: ReactNode;
  title?: string;
  countries: CountryNameAndAlpha[];
};

const Layout = ({ children, title = "", countries = [] }: Props) => {
  return (
    <>
      <NextSeo title={title} />
      <header className="bg-white flex-shrink-0 border-b">
        <div className="mx-auto px-6 grid grid-cols-3">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col space-y-1">
              <div>
                <span className="inline-flex items-center px-[10px] py-[2px] rounded-full font-semibold bg-blue-100 text-blue-800 uppercase text-[12px] tracking-widest">
                  Beta
                </span>
              </div>
              <h1 className="font-semibold text-2xl">
                Digital Nation Dashboard
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/">
              <a className="h-[100px] block">
                <img
                  className="h-full w-auto"
                  src="/undp-logo.svg"
                  alt="UNDP Logo"
                />
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-8">
            <Link href="/about">
              <a className="uppercase text-sm hover:underline font-medium tracking-wider">
                About
              </a>
            </Link>
            <Link href="/data">
              <a className="uppercase text-sm hover:underline font-medium tracking-wider">
                Data
              </a>
            </Link>
            <SearchDialog countries={countries} />
          </div>
        </div>
      </header>
      <main className="flex-shrink-0 main">{children}</main>

      <footer className="bg-brand-blue py-16 flex items-center justify-center text-white">
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="flex items-center"
        >
          <GrCreativeCommons className="mr-1" />
          <FaCreativeCommonsBy className="mr-1" />
          United Nations Development Programme
        </a>
      </footer>
    </>
  );
};

export default Layout;
