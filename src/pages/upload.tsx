import type { NextPage } from "next";
import Head from "next/head";
import { UploadView } from "../views";

const Upload: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Token Creator - Upload Metadata</title>
        <meta
          name="description"
          content="Upload metadata to IPFS"
        />
      </Head>
      <UploadView />
    </div>
  );
};

export default Upload;