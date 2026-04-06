import type { StringPartToDelimiterCase } from "@shared";

export type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
      FirstPart,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}${StringArrayToDelimiterCase<
      RemainingParts,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}`
  : "";
