import { Handjet } from "next/font/google";
import { useContext } from "react";
import { RollsContext } from "./contexts";

const handJet = Handjet({ subsets: ["latin"] });

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
    <svg
      height="100%"
      width="100%"
      viewBox="0 0 20 20"
      className="rounded-xl border-4 border-black"
    >
      <text
        x="50%"
        y="11.5"
        textAnchor="middle"
        dominantBaseline="middle"
        className={`${handJet.className} text-[14px]`}
      >
        {number}
      </text>
    </svg>
  );
}

export default function Dice() {
  const { rolls } = useContext(RollsContext);

  return (
    <div className={`grid gap-4 ${gridCols(rolls.length)}`}>
      {rolls.map((roll, i) => (
        <Die number={roll} key={i} />
      ))}
    </div>
  );
}
