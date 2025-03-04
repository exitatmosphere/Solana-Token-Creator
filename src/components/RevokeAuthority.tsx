import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionSignature } from "@solana/web3.js";
import { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import {
  AuthorityType,
  createSetAuthorityInstruction,
} from "@solana/spl-token";

export const RevokeAuthority: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [authorityType, setAuthorityType] = useState(AuthorityType.MintTokens);

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

      transaction.add(
        createSetAuthorityInstruction(
          tokenMintPubkey,
          publicKey,
          authorityType,
          null,
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
  }, [publicKey, tokenMintAddress, authorityType, sendTransaction, connection]);

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
          <div className="m-auto p-2 text-xl font-normal">Authority type</div>
          <div className="m-auto p-2">
            <select
              className="select-bordered select text-xl font-normal"
              value={authorityType}
              onChange={(e) =>
                setAuthorityType(Number(e.target.value) as AuthorityType)
              }
            >
              <option value={AuthorityType.MintTokens}>Mint</option>
              <option value={AuthorityType.FreezeAccount}>Freeze</option>
            </select>
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
