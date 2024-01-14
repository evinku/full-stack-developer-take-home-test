import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

const MetaMaskBtn = () => {
  const [loading, setLoading] = useState(false);
  const [hasMetaMaskInstalled, setHasMetaMaskInstalled] = useState(true);
  const { connector, hooks } = useWeb3React();
  const { useSelectedAccount, useSelectedChainId, } = hooks

  const account = useSelectedAccount(connector);
  const chainId = useSelectedChainId(connector)

  const onConnectMetaMask = async () => {
    try {
      await connector.activate(chainId);
    } catch (err) {
      console.log("User rejected the request", err);
      setLoading(false);
    }
  };

  const onDisconnectMetaMask = () => {
    if (connector?.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      setHasMetaMaskInstalled(false)
    }

    if (account) setLoading(false);
  }, [account]);

  return (
    <>
      {account ? (
        <>
          <p className="text-sm font-semibold">
            Your wallet address: <span className="font-bold">{account}</span>
          </p>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-300 flex items-center"
            onClick={onDisconnectMetaMask}
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 flex items-center ${loading || !hasMetaMaskInstalled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading || !hasMetaMaskInstalled}
            onClick={onConnectMetaMask}
          >
            <span className="inline-flex items-center justify-center mr-2">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/metamask-icon.png"
                alt="MetaMask"
                className="w-8 h-8"
              />
            </span>
            MetaMask
          </button>
          {!hasMetaMaskInstalled && <span className='text-sm' >Please install MetaMask first</span>}
        </>
      )}
    </>
  );
};

export default MetaMaskBtn;