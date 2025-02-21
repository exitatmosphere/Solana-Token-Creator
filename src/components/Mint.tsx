import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionSignature } from "@solana/web3.js";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import { INPUT_FLOAT_REGEX } from "../constants";
import {
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";

export const Mint: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("0.0");

  const tokenInputValidation = async (e: ChangeEvent<HTMLInputElement>) => {
    const res = new RegExp(INPUT_FLOAT_REGEX).exec(e.target.value);
    res && setAmount(e.target.value);
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = "";
    const transaction = new Transaction();

    try {
      const tokenMintPubkey = new PublicKey(tokenMintAddress);
      const receiverPubkey = new PublicKey(receiverAddress);

      const mintAccountInfo = await getMint(connection, tokenMintPubkey);
      const decimals = mintAccountInfo.decimals;

      const tokenReceiverAccount = await getAssociatedTokenAddress(
        tokenMintPubkey,
        receiverPubkey,
        true,
      );

      if (
        !(await connection.getAccountInfo(tokenReceiverAccount))?.data.length
      ) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenReceiverAccount,
            receiverPubkey,
            tokenMintPubkey,
          ),
        );
      }

      transaction.add(
        createMintToInstruction(
          tokenMintPubkey,
          tokenReceiverAccount,
          publicKey,
          10 ** decimals * Number(amount),
        ),
      );

      signature = await sendTransaction(transaction, connection);

      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Transaction failed! ${error?.message}`, signature);
      return;
    }
  }, [
    publicKey,
    tokenMintAddress,
    receiverAddress,
    amount,
    sendTransaction,
    connection,
  ]);

  return (
    <div>
      <div>
        <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="m-auto p-2 text-xl font-normal">
            Token mint address
          </div>
          <div className="m-auto p-2">
            <input
              className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
              onChange={(e) => setTokenMintAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="m-auto p-2 text-xl font-normal">
            Receiver wallet address
          </div>
          <div className="m-auto p-2">
            <input
              className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="m-auto p-2 text-xl font-normal">Amount</div>
          <div className="m-auto p-2">
            <input
              className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
              value={amount}
              maxLength={20}
              onChange={(e) => tokenInputValidation(e)}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className="... group btn m-2 w-60 animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 disabled:animate-none "
            onClick={onClick}
            disabled={!publicKey}
          >
            <div className="hidden group-disabled:block ">
              Wallet not connected
            </div>
            <span className="block group-disabled:hidden">
              Send Transaction
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
