import React from "react";
import Head from "next/head";
import LogbookHistory from "../../components/Logbook/History/logbookHistory";

function Logbook() {

  return (
    <>
      <Head>
        <title>CT Logbook</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LogbookHistory />
    </>
  );
}

export default Logbook;
