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

export type UseStyleSheetCallback<T> = (
  tags: string,
  cssVariables: CssVariablesObject<T>,
) => CSSObject;

export interface UseStyleSheet {
  <T>(
    props: UseStyleSheetCallback<T>,
    $window?: Window & typeof globalThis,
  ): (tag: string) => CSSStyleSheet;
  (props: CSSObject, $window?: Window & typeof globalThis): CSSStyleSheet;
}

/**
 * Represents transition properties for CSS animations.
 */
interface Transition {
  /**
   * The CSS properties to apply the transition to.
   */
  property: string[];
  /**
   * The duration of the transition.
   */
  duration?: string;
  /**
   * The timing function for the transition.
   */
  timingFunction?: string;
  /**
   * The delay before the transition starts.
   */
  delay?: string;
}

export interface UseTransition {
  (props: Transition): CSSObject;
}

/**
 * Represents keyframes for CSS animations.
 */
type TransitionKeyframes =
  | ({
    [k in keyof Omit<CSSProperties, "offset">]?: CSSProperties[k][];
  } & { offset?: number[] })
  | (Omit<CSSProperties, "offset"> & { offset?: number })[];

export interface UseAnimation {
  (
    keyframes: TransitionKeyframes,
    options: Pick<
      KeyframeAnimationOptions,
      "id" | "delay" | "direction" | "duration" | "easing" | "fill"
    > & {
      iterations?: "infinite" | number;
    },
  ): [CSSObject, CSSObject];
}