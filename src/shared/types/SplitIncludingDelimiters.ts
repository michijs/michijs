export type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends ""
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
    ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter
        ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
          ? [
              ...SplitIncludingDelimiters<FirstPart, Delimiter>,
              UsedDelimiter,
              ...SplitIncludingDelimiters<SecondPart, Delimiter>,
            ]
          : never
        : never
      : never
    : [Source];
