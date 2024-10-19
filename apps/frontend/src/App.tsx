import React, { useState, useEffect } from "react";
import { ConnectButton, useConnection } from "arweave-wallet-kit";
import EnhancedDiceGame from "./components/Random";

const App: React.FC = () => {
  const { connected } = useConnection();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  return (
    <div className="flex flex-col min-h-screen bg-[#E3E7D3]">
      <nav className="p-4">
        <img src="/full_logo.svg" alt="logo" className="h-20" />
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-[#D0DCA2]/20 rounded-3xl border-2 p-20 lg:p-10 border-[#7D8569] w-full max-w-2xl relative">
          <h1 className="text-[#45512A] text-4xl font-medium font-raleway text-center mb-8">
            Dice Game with Orbit
          </h1>

          <img
            src="/dice.svg"
            alt="Dice"
            className="absolute top-0 right-0 w-32 h-32 transform rotate-180"
          />
          <img
            src="/dice.svg"
            alt="Dice"
            className="absolute bottom-0 left-0 w-32 h-32 transform"
          />

          {isConnected ? (
            <div className="flex justify-center flex-col items-center">
              <ConnectButton
                profileModal={true}
                showBalance={true}
                className="mb-4"
              />
              <EnhancedDiceGame />
            </div>
          ) : (
            <div className="text-center flex justify-center flex-col items-center">
              <ConnectButton
                profileModal={true}
                showBalance={true}
                className="mb-4"
              />
              <p className="text-[#45512A] text-lg font-medium font-raleway mt-4">
                Connect your Arweave Wallet to continue
              </p>
            </div>
          )}
        </div>
        <div className="pt-4 font-raleway">Check out the blog <a href="https://0rbit.hashnode.dev/dice-game-with-0rbit" className="text-orange-500 hover:underline">here!</a></div>
      </main>

      <footer className="flex justify-center space-x-6 p-4">
        <a
          href="https://x.com/0rbitco"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
        </a>
        <a
          href="https://discord.gg/nm6VKUQBrA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/discord.svg" alt="Discord" className="w-6 h-6" />
        </a>
        <a
          href="https://docs.0rbit.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/docs.svg" alt="Documentation" className="w-6 h-6" />
        </a>
      </footer>
    </div>
  );
};

export default App;