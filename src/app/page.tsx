"use client";

import { useState } from "react";
import { RollsContext, SideCountContext } from "./contexts";
import Input from "./input";
import Dice from "./dice";
import RollButton from "./roll-button";
import { getRandomRolls } from "./random";

export default function Home() {
  const [sides, setSides] = useState(6);
  const [rolls, setRolls] = useState([0, 2]);

  const onDiceChange = (count: number) => {
    setRolls(getRandomRolls(count, sides));
  };

  return (
    <SideCountContext.Provider value={{ sides, setSides }}>
      <RollsContext.Provider value={{ rolls, setRolls }}>
        <main className="container mx-auto grid grid-cols-2 gap-4 p-4 md:grid-cols-5 xl:max-w-[1024px]">
          <div className="col-span-3 flex gap-4">
            <Dice />
          </div>
          <div className="col-span-2 flex flex-col gap-8">
            <div className="flex gap-4">
              <div className="grow">
                <h2 className="mb-2 font-bold">Sides</h2>
                <Input value={sides} setValue={setSides} />
              </div>
              <div className="grow">
                <h2 className="mb-2 font-bold">Dice</h2>
                <Input value={rolls.length} setValue={onDiceChange} max={9} />
              </div>
            </div>
            <RollButton />
          </div>
        </main>
      </RollsContext.Provider>
    </SideCountContext.Provider>
  );
}
