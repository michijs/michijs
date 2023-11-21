import { ValueSets } from "./generated/ValueSets";
export type DataGlobalAttributes = {
  [k in `data-${string}`]: ValueSets["default"];
};
