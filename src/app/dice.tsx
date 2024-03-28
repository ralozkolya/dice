import diceSrc from "@/assets/dice.svg";
import { useContext } from "react";
import { RollsContext } from "./contexts";

function valueToCss(value: number): string {
  const x = ((value % 4) / 3) * 100;
  const y = (Math.floor(value / 4) / 4) * 100;
  return `${x}% ${y}%`;
}

function gridCols(count: number) {
  switch (count) {
    case 1:
    case 2:
    case 4:
      return "grid-cols-2";
    default:
      return "grid-cols-3";
  }
}

interface DieProps {
  number: number;
}

function Die({ number }: DieProps) {
  return (
    <div
      className="col-span-1 aspect-square"
      style={{
        backgroundPosition: valueToCss(number),
        backgroundImage: `url(${diceSrc.src})`,
        backgroundSize: "400% 500%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export default function Dice() {
  const { rolls } = useContext(RollsContext);

  return (
    <div className={`grid grow justify-center gap-4 ${gridCols(rolls.length)}`}>
      {rolls.map((roll, i) => (
        <Die number={roll} key={i} />
      ))}
    </div>
  );
}
