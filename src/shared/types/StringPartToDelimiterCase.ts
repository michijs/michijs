
export type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators
  ? Delimiter
  : StringPart extends UsedUpperCaseCharacters
  ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;