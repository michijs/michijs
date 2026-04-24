/** Extracts parameter names from a route pattern string (e.g. "/users/:id/:tab" → "id" | "tab") */
export type ExtractParamKeys<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParamKeys<Rest>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;
