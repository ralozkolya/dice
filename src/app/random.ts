export function getRandomRolls(count: number, max: number) {
  const values = new Uint32Array(count);
  crypto.getRandomValues(values);
  return Array.from(
    values.map((value) => Math.floor((value / (0xffffffff + 1)) * max) + 1),
  );
}

export function getFakeRolls(count: number, max: number) {
  return Array(count)
    .fill(1)
    .map(() => Math.floor(Math.random() * max) + 1);
}
