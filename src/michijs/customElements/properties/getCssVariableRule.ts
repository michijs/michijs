import { formatToKebabCase } from "../../utils";

export const getCssVariableRule = (
  key: string,
  value: unknown,
  selector: string,
) => `${selector}{--${formatToKebabCase(key)}:${value}}`;
