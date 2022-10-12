import type { NextPage } from "next";
import Head from "next/head";
import { CreateView } from "../views";

const Create: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Token Creator - Create Token</title>
        <meta
          name="description"
          content="Create solana fungible token"
        />
      </Head>
      <CreateView />
    </div>
  );
};

export default Create;