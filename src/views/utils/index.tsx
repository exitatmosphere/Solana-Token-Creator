import { FC, useState } from "react";
import { TOKEN_OPERATIONS } from "../../constants";
import { Mint } from "components/Mint";
import { RevokeAuthority } from "components/RevokeAuthority";

export const UtilsView: FC = ({}) => {
  const [operation, setOperation] = useState(TOKEN_OPERATIONS.MINT);

  return (
    <div className="mx-auto p-4 md:hero">
      <div className="flex flex-col md:hero-content">
        <h1 className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-center text-5xl font-bold text-transparent">
          Token utils
        </h1>
        {/* CONTENT GOES HERE */}
        <div className="text-center">
          <div>
            <div>
              <div className="p-2">
                <select
                  className="select-bordered select text-xl font-normal"
                  value={operation}
                  onChange={(e) =>
                    setOperation(e.target.value as TOKEN_OPERATIONS)
                  }
                >
                  <option value={TOKEN_OPERATIONS.MINT}>Mint token</option>
                  <option value={TOKEN_OPERATIONS.REVOKE_AUTHORITY}>
                    Revoke authority
                  </option>
                </select>
              </div>
              {(() => {
                switch (operation) {
                  case TOKEN_OPERATIONS.MINT:
                    return <Mint />;
                  case TOKEN_OPERATIONS.REVOKE_AUTHORITY:
                    return <RevokeAuthority />;
                  default:
                    break;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
