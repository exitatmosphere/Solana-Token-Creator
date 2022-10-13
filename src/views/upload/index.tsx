import { UploadMetadata } from "components/UploadMetadata";
import { FC } from "react";

export const UploadView: FC = ({}) => {
  return (
    <div className="mx-auto p-4 md:hero">
      <div className="flex flex-col md:hero-content">
        <h1 className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-center text-5xl font-bold text-transparent">
          Upload metadata to IPFS
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <UploadMetadata />
        </div>
      </div>
    </div>
  );
};
