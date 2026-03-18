import type { IsAny, KebabCase, StringKeyOf } from "@shared";
import type { CSSProperties } from '../jsx-runtime/generated/htmlType'
import type { ObservableOrConst } from "@ports";

export type CSSVar<T extends string> = <
  V extends undefined | string | number = undefined,
>(
  defaultValue?: V,
) => `var(${KebabCase<T>}${V extends undefined ? "" : `,${V}`})`;
export type CssVariablesObject<
  T extends object | unknown,
  PK extends string = "-",
> = IsAny<T> extends true
  ? any
  : T extends object
  ? {
    [k in StringKeyOf<T>]: CssVariablesObject<T[k], `${PK}-${k}`>;
  }
  : CSSVar<PK> & string;


export type CSSProperty =
  | CSSObject
  | CSSProperties
  | string
  | number
  | undefined
  | null;
export interface CSSObject {
  [key: string]: ObservableOrConst<CSSProperty>;
}