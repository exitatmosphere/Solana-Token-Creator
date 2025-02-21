import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import { INPUT_FLOAT_REGEX } from "../constants";

export const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("0.0");

  const solInputValidation = async (e: ChangeEvent<HTMLInputElement>) => {
    const res = new RegExp(INPUT_FLOAT_REGEX).exec(e.target.value);
    res && setAmount(e.target.value);
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    const creatorAddress = new PublicKey(
      "8347h8LeaVAUzyWES3Xj2Gd6QTpGrCayKBpuYvBW3PWD",
    );
    let signature: TransactionSignature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        }),
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
  }, [publicKey, amount, sendTransaction, connection]);

  return (
    <div className="mt-4">
      <div className="p-2">
        <div className="text-xl font-normal">Send some SOL to creator</div>
      </div>
      <div className="p-2">
        <input
          className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
          value={amount}
          maxLength={20}
          onChange={(e) => solInputValidation(e)}
        />
      </div>
      <button
        className="... group btn m-2 w-60 animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 disabled:animate-none "
        onClick={onClick}
        disabled={!publicKey}
      >
        <div className="hidden group-disabled:block ">Wallet not connected</div>
        <span className="block group-disabled:hidden">Send Transaction</span>
      </button>
    </div>
  );
};
