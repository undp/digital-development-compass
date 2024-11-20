import Script from "next/script";
import { DefaultSeo } from "next-seo";

import "flagpack/dist/flagpack.css";
import Head from "next/head";

import "../styles/global.css";
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '/undp-digital-development-compass';
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="Home"
        titleTemplate="UNDP Digital Development Compass | %s"
        twitter={{
          handle: "@UNDPdigital",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="shortcut icon" href={`${prefix}/favicon.ico`} />
        <meta charSet="utf-8" />

        <meta name="description" content="UNDP Digital Development Compass" />
        <meta name="keywords" content="UNDP, Digital, Development, Compass" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2990591,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      ></Script>
      <Component {...pageProps} />
    </>
  );
}
