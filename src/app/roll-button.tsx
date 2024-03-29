import { useContext, useState } from "react";
import { RollsContext, SideCountContext } from "./contexts";
import { getFakeRolls, getRandomRolls } from "./random";

export default function RollButton() {
  const [isRolling, setIsRolling] = useState(false);

  const { rolls, setRolls } = useContext(RollsContext);
  const { sides } = useContext(SideCountContext);

  const roll = () => {
    setIsRolling(true);
    const interval = setInterval(() => {
      setRolls(getFakeRolls(rolls.length, sides));
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      setRolls(getRandomRolls(rolls.length, sides));
      setIsRolling(false);
    }, 500);
  };

  return (
    <button
      className="rounded-md bg-blue-600 p-2 text-white transition-colors duration-300 hover:bg-blue-500 disabled:bg-blue-300"
      onClick={roll}
      disabled={isRolling}
    >
      {isRolling ? "Rolling..." : "Roll"}
    </button>
  );
}
