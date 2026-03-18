import type { IfEquals } from "@shared";

export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    {
      [Q in P]: T[P];
    },
    {
      -readonly [Q in P]: T[P];
    },
    P
  >;
}[keyof T];