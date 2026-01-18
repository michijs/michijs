
import type { GetElementProps, ObservableTypeOrConst, ObservableComplexObject, ObservableLike, Lifecycle, LifecycleInternals, ObservableType, AttributesType, MappedIdGenerator, FC } from '@domain';
import type { WritableKeys } from '@shared'
export type ExtendableComponent<T> = {
  as?: T;
} & GetElementProps<T>;

// Intentionally using never - otherwise generics does not work
export type ExtendableComponentWithoutChildren<T = undefined> =
  ExtendableComponent<T> & {
    children?: never;
  };


export interface MichiAttributes<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: ObservableTypeOrConst<E[k] | undefined | null>;
  };
}
export interface MichiAttributesCustomElement<E> {
  children?: JSX.Element;
  _?: {
    [k in WritableKeys<E>]?: E[k] extends ObservableComplexObject<infer U>
    ? ObservableLike<U | undefined | null> | U | undefined | null
    : ObservableTypeOrConst<E[k] | undefined | null> | undefined | null;
  };
}

export interface MichiProperties
  extends Lifecycle,
  LifecycleInternals,
  Partial<
    Pick<
      ElementInternals,
      | "checkValidity"
      | "reportValidity"
      | "form"
      | "validity"
      | "validationMessage"
      | "willValidate"
    >
  > {
  // props?: unknown,
  readonly $michi: {
    store: ObservableType<AttributesType>;
    alreadyRendered: boolean;
    adoptedBy?: Window & typeof globalThis;
    shadowRoot?: ShadowRoot | null;
    styles: {
      className?: string;
      cssVariables?: CSSStyleSheet;
      computedStyleSheet?: CSSStyleSheet;
      mappedAdoptedStyleSheets?: CSSStyleSheet[];
    };
    idGen?: MappedIdGenerator["getId"];
    internals?: ElementInternals;
  };
  render?(): JSX.Element;
  /**Allows to get a child element from the host with the selector */
  child<T = HTMLElement>(
    selector: string,
  ): (T extends new (props: any) => infer Y ? Y : T) | undefined;
  /**Create unique IDs with a discernible key */
  readonly idGen: MappedIdGenerator["getId"];
  readonly name: string | null;
  readonly type: string;
}

export interface CustomElementWithCallbacks extends HTMLElement {
  disconnectedCallback?(): void;
  connectedCallback?(): void;
  attributeChangedCallback?(
    name: string,
    oldValue: unknown,
    newValue: unknown,
  ): void;
}

export interface MichiCustomElement extends HTMLElement, MichiProperties { }

export type ListProps<E, SV> = ExtendableComponentWithoutChildren<E> & {
  renderItem: FC<SV>;
  /**
   * Uses cloneNode instead of creating every item separately. It is twice as fast as not using a template
   *
   * **Warning:** It only works with plain objectJSXElements or classJSXElements
   *
   * Do not use conditions, arrays or fragments on the renderItem function if this is enabled
   */
  useTemplate?: boolean;
};


export type GetElementProps<El> = El extends (...args: infer Y) => any
  ? Y[0]
  : El extends {
    new(...args: infer T): any;
  }
  ? T[0]
  : El extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[El]
  : {};

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

export interface CookieStorageConstructor
  extends Omit<CookieInit, "name" | "value"> { }

declare global {
  interface Window {
    msCrypto?: Crypto;

    URLPattern?: {
      new(
        url: Partial<URL> & { baseURL?: string },
      ): {
        test(url: string): boolean;
      };
    };
  }
}
