import { Mint } from "components/Mint";
import { FC } from "react";

export const UtilsView: FC = ({}) => {
  return (
    <div className="mx-auto p-4 md:hero">
      <div className="flex flex-col md:hero-content">
        <h1 className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-center text-5xl font-bold text-transparent">
          Token utils
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <Mint />
        </div>
      </div>
    </div>
  );
};
