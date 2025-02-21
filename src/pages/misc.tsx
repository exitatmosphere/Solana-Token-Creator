import type { NextPage } from "next";
import Head from "next/head";
import { MiscView } from "../views";

const Misc: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Token Creator - Miscellaneous</title>
        <meta name="description" content="Additional functionality" />
      </Head>
      <MiscView />
    </div>
  );
};

export default Misc;
