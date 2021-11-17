import Head from "next/head"; // HTML Head
import Header from "@components/Header"; // Header component
import LayoutScss from "@styles/components/Layout.module.scss"; // Page styles
import React from "react";

export default function Layout({ children }, isProfile) {
  const head = () => (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montagu+Slab&display=swap"
        rel="stylesheet"
      ></link>
    </div>
  );
  console.log("LayoutScss", LayoutScss);
  return (
    <React.Fragment>
      <div className={LayoutScss.__wrapper}>
        {head()}
        <Header />
        <div className="container pt-5 pb-2">{children}</div>
      </div>
    </React.Fragment>
  );
}
