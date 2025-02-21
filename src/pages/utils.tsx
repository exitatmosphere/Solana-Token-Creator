import type { NextPage } from "next";
import Head from "next/head";
import { UtilsView } from "../views";

const Utils: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Token Creator - Token Utils</title>
        <meta name="description" content="Token functionality" />
      </Head>
      <UtilsView />
    </div>
  );
};

export default Utils;
