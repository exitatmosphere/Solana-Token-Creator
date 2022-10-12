import { FC } from "react";
import pkg from '../../../package.json';

export const HomeView: FC = ({ }) => {

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Solana Token Creator <span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <h4 className="md:w-full text-center text-slate-300 my-2">
          <p>Interactive way to create your own solana token.</p>
          No coding skills or knowledge of token structure required.
        </h4>
        <ol className="list-decimal list-inside self-center font-medium text-2xl animate-pulse text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          <li>
            <a 
              className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500"
              href="./upload"
            >
              Upload token metadata to IPFS
            </a>
          </li>
          <li>
            <a 
              className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500"
              href="./misc"
            >
              {"Request airdrop if needed (only for devnet)"}
            </a>
          </li>
          <li>
            <a 
              className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500"
              href="./create"
            >
              Create token
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};
