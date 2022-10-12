import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback, useState } from 'react';
import { notify } from "../utils/notifications";

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [amount, setAmount] = useState('0.0');

    const solInputValidation = async (e) => {
        const monstrosity = /((^\.(\d+)?$)|(^\d+(\.\d*)?$)|(^$))/;
        const res = new RegExp(monstrosity).exec(e.target.value);
        res && setAmount(e.target.value);
    };

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }

        const creatorAddress = new PublicKey("8347h8LeaVAUzyWES3Xj2Gd6QTpGrCayKBpuYvBW3PWD");
        let signature: TransactionSignature = '';
        
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: creatorAddress,
                    lamports: LAMPORTS_PER_SOL * Number(amount),
                })
            );

            signature = await sendTransaction(transaction, connection);
            
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, amount, sendTransaction, connection]);

    return (
        <div className="mt-4">
            <div className="p-2">
                <div className="text-xl font-normal">
                    Send some SOL to creator
                </div>
            </div>
            <div className="p-2">
                <input
                    className="px-4 py-2 text-xl font-normal text-gray-700 border rounded focus:border-blue-600 focus:outline-none"
                    value={amount}
                    maxLength={20}
                    onChange={(e) => solInputValidation(e)}
                />
            </div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Send Transaction 
                </span>
            </button>
        </div>
    );
};
