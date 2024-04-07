import FormSelection from "../components/FormSelection";
import Head from "next/head";
import React from "react";

// TODO Discuss changing
// TODO the index page to redirecting to message board to enhance handover
function Index() {
  return (
    <>
      <Head>
        <title>CT Logging System</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <FormSelection />
    </>
  );
}

export default index;
