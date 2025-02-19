import { FC, useState } from "react";
import { notify } from "utils/notifications";
import { ClipLoader } from "react-spinners";
import { PinataSDK } from "pinata-web3";

export const UploadMetadata: FC = () => {
  const [ipfsToken, setIpfsToken] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [jsonUri, setJsonUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const uploadMetadata = async () => {
    const pinata = new PinataSDK({
      pinataJwt: ipfsToken,
    });
    setIsLoading(true);
    try {
      const imageUploadResponse = await pinata.upload.file(imageFile);
      const ipfsImageUri = `https://ipfs.io/ipfs/${imageUploadResponse.IpfsHash}`;

      const json = {
        name: tokenName,
        symbol: tokenSymbol,
        description: tokenDescription,
        image: ipfsImageUri,
      };
      const jsonBlob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });
      const jsonFileName = "uri.json";
      const jsonFile = new File([jsonBlob], jsonFileName);
      const jsonUploadResponse = await pinata.upload.file(jsonFile);
      const ipfsJsonUri = `https://ipfs.io/ipfs/${jsonUploadResponse.IpfsHash}`;
      setJsonUri(ipfsJsonUri);
    } catch (error: any) {
      notify({ type: "error", message: "Upload failed" });
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
          <ClipLoader />
        </div>
      )}
      {!jsonUri ? (
        <div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Pinata JWT</div>
              <p>Token used to upload your data to IPFS.</p>
              <p>Currently only Pinata is supported.</p>
              <p>
                You can get one
                <a
                  className="cursor-pointer font-medium text-purple-500 hover:text-indigo-500"
                  href="https://app.pinata.cloud/developers/api-keys"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" here "}
                </a>
                for free.
              </p>
            </div>
            <div className="m-auto p-2">
              <input
                className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                onChange={(e) => setIpfsToken(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Token icon</div>
              <p>Image file of your future token.</p>
            </div>

            <div className="flex p-2">
              <div className="m-auto rounded border border-dashed border-white px-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <label className="cursor-pointer font-medium text-purple-500 hover:text-indigo-500">
                  <span>Upload an image</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                {!imageFile ? null : (
                  <p className="text-gray-500">{imageFile.name}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2 text-xl font-normal">Token name</div>
            <div className="m-auto p-2">
              <input
                className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Token symbol</div>
              <p>{"Abbreviated name (e.g. Solana -> SOL)."}</p>
            </div>
            <div className="m-auto p-2">
              <input
                className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="m-auto p-2">
              <div className="text-xl font-normal">Token description</div>
              <p>Few words about your token purpose.</p>
            </div>
            <div className="m-auto p-2">
              <input
                className="rounded border px-4 py-2 text-xl font-normal text-gray-700 focus:border-blue-600 focus:outline-none"
                onChange={(e) => setTokenDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className="... btn m-2 animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] px-8 hover:from-pink-500 hover:to-yellow-500"
              onClick={uploadMetadata}
            >
              Upload Metadata
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 break-words">
          <p className="font-medium">
            Link to your uploaded metadata. You will need this as uri parameter
            when creating a token.
          </p>
          <a
            className="cursor-pointer font-medium text-purple-500 hover:text-indigo-500"
            href={jsonUri}
            target="_blank"
            rel="noreferrer"
          >
            {jsonUri}
          </a>
        </div>
      )}
    </div>
  );
};
