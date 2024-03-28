import { createContext } from "react";

export const SideCountContext = createContext({
  sides: 6,
  setSides: (val: number) => {},
});
export const RollsContext = createContext({
  rolls: [0, 2],
  setRolls: (val: number[]) => {},
});
