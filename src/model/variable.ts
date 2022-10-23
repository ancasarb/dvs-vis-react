import { Penguin } from "../data/penguins";

const billRatio = (d: Penguin) => d.billLength / d.billDepth;
const billLength = (d: Penguin) => d.billLength;
const billDepth = (d: Penguin) => d.billDepth;

export type Variable = "ratio" | "length" | "depth";
export const variables: Variable[] = ["ratio", "length", "depth"];

const variableAccessor: Record<Variable, (p: Penguin) => number> = {
  depth: billDepth,
  length: billLength,
  ratio: billRatio,
};

export const accessorForVariable = (variable: Variable) =>
  variableAccessor[variable];

const titles: Record<Variable, string> = {
  depth: "Bill Depth",
  length: "Bill Length",
  ratio: "Bill Ratio",
};

export const titleForVariable = (variable: Variable) => titles[variable];
