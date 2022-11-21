// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title key="title">Testing | Smart Math Tutoring</title>
        <link rel="icon" type="image/png" href="/smtlogo.png" />
      </Head>
      <body className="bg-slate-900 body-font font-Inter h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
