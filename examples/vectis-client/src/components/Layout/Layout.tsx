import React, { PropsWithChildren, useState } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { GradientButton } from "../Buttons";
import { FiGithub } from "react-icons/fi";
import SimpleDropdown from "../Dropdowns/SimpleDropdown";
import { IntlAddress } from "../../utils/intl";

const chains = [
  { name: "Juno Testnet", chainId: "uni-6" },
  { name: "Stargaze Testnet", chainId: "elgafar-1" },
  { name: "Osmosis Testnet", chainId: "osmo-test-5" },
];

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectWallet, userKey, chain, setChain } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const connect = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
    } catch (err) {}
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <nav className="max-w-[1000px] p-4 mx-auto w-full flex items-center justify-between gap-2">
        {userKey && (
          <>
            <p className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500">
              TODO's
            </p>
            <div className="text-white text-md flex gap-2 justify-center items-center mx-4">
              {IntlAddress(userKey.address)}
              <SimpleDropdown options={chains.map(({ name, chainId }) => ({ name, click: () => setChain(chainId) }))}>
                {chains.find((c) => c.chainId === chain)?.name}
              </SimpleDropdown>
            </div>
          </>
        )}
      </nav>
      {userKey ? (
        <div className="flex max-w-[1000px] w-full mx-auto p-4 h-full flex-1">{children}</div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <GradientButton onClick={connect} className="min-w-[85px] min-h-[35px] flex justify-center items-center">
            {isLoading ? (
              <div className="rounded-full animate-spin border-2 border-solid border-black border-t-transparent h-6 w-6" />
            ) : (
              <p>Log in!</p>
            )}
          </GradientButton>
        </div>
      )}
      <footer className="w-full h-[5rem] bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 flex items-center justify-center mt-[6rem]">
        <a
          className="pointer hover:underline text-slate-900 text-xl font-bold flex gap-2"
          href="https://github.com/nymlab/vectis-extension-client"
          target="_blank"
        >
          <FiGithub size={24} /> Vectis - Example
        </a>
      </footer>
    </div>
  );
};

export default Layout;
