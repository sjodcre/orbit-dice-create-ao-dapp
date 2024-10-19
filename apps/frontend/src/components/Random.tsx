import React, { useState, useCallback, useEffect } from 'react';
import { message, createDataItemSigner, dryrun } from "@permaweb/aoconnect";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { RNG } from '../constants/rng_process';

const getRandomNumber = async (): Promise<number> => {
  try {
    const msg = await message({
      process: RNG,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: [{ name: "Action", value: "GetNumber" }],
    });
    console.log("Message sent:", msg);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const output = await dryrun({
          process: RNG,
          tags: [{ name: "Action", value: "ReadNumber" }],
        });
        const random = parseInt(output.Output["data"]);
        console.log(random);
        resolve(random);
      }, 2000);
    });
  } catch (error) {
    console.error("Error getting random number:", error);
    throw error;
  }
};

const DiceIcon = ({ number, isRolling }: { number: number | null; isRolling: boolean }) => {
  const [currentFace, setCurrentFace] = useState(1);
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  useEffect(() => {
    let interval: any;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentFace((prev) => (prev % 6) + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const DiceComponent = icons[(number !== null ? number : currentFace) - 1] || Dice1;

  return (
    <div className={`transition-transform duration-100 ${isRolling ? '' : ''}`}>
      <DiceComponent size={100} />
    </div>
  );
};

const EnhancedDiceGame: React.FC = () => {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRollDice = useCallback(async () => {
    setIsRolling(true);
    setError(null);
    setDiceNumber(null);
    try {
      const result = await getRandomNumber();
      setTimeout(() => {
        setDiceNumber(result);
        console.log("Result:", result);
        setIsRolling(false);
      }, 2000);
    } catch (err) {
      setError("Failed to roll the dice. Please try again.");
      console.error("Failed to generate random number:", err);
      setIsRolling(false);
    }
  }, []);

  return (
    <div className="">
      <div className="flex flex-col items-center mb-4">
        <div className="mb-4 h-[100px] flex items-center justify-center">
          <DiceIcon number={diceNumber} isRolling={isRolling} />
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <button
          onClick={handleRollDice}
          disabled={isRolling}
          className="bg-[#EB8F44] hover:bg-[#EB8F44]/60 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
      <div className="text-center">
        {diceNumber && !isRolling && (
          <p className="text-sm text-gray-600">
            You rolled a {diceNumber}!
          </p>
        )}
      </div>
    </div>
  );
};

export default EnhancedDiceGame;