import type {
  SplitIncludingDelimiters,
  StringArrayToDelimiterCase,
  UpperCaseCharacters,
  WordSeparators,
} from "#shared";

export type DelimiterCase<
  Value,
  Delimiter extends string,
> = Value extends string
  ? StringArrayToDelimiterCase<
      SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
      WordSeparators,
      UpperCaseCharacters,
      Delimiter
    >
  : Value;
