import type { MichiCustomElement } from "../../types";
import { setAttribute } from "../attributes/setAttribute";

export const updateClassCallback = (
  newValue: unknown,
  el: MichiCustomElement,
) => {
  const newValueWithClassName = `${newValue} ${el.$michi.styles.className}`;
  setAttribute(el, "class", newValueWithClassName);
};
