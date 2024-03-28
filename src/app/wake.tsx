"use client";

import NoSleep from "nosleep.js";
import { ChangeEvent } from "react";

export default function Wake() {
  const toggle = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    const noSleep = new NoSleep();
    checked ? noSleep.enable() : noSleep.disable();
  };

  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" onChange={toggle} />
      Prevent the screen from turning off
    </label>
  );
}
