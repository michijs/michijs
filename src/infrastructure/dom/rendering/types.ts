import type { ObservableProxyPort, ObservablePort, ObservableProxiedArray, ObservableProxiedPrimitivePort, ObservableProxyOrConst, ObservableNonNullableProxiedPrimitiveType, UnproxifyPort } from "@domain";
import type { AnyObject, PrimitiveType } from "@shared";

export interface CommonJSXAttrs<T> {
  attrs: Record<string, any> & {
    children?: SingleJSXElement[] | SingleJSXElement;
  };
  jsxTag: T;
}
export interface FragmentJSXElement extends CommonJSXAttrs<null | undefined> {}
export interface ObjectJSXElement extends CommonJSXAttrs<string> {}
export interface DOMElementJSXElement<E extends Element = Element>
  extends CommonJSXAttrs<E> {}
export interface FunctionJSXElement
  extends CommonJSXAttrs<CreateFCResult<any>> {}
export interface ClassJSXElement
  extends CommonJSXAttrs<
    (new (...args: any[]) => Element) & { tag: string; extends?: string }
  > {}
export type SingleJSXElement =
  | PrimitiveType
  | ObjectJSXElement
  | FunctionJSXElement
  | FragmentJSXElement
  | ClassJSXElement
  | ArrayJSXElement
  | DOMElementJSXElement
  | Node
  | Promise<any>
  | ObservablePort<unknown>;
export type ArrayJSXElement = SingleJSXElement[];

export type FCProps<T = {}> = {
  [k in keyof T]: k extends "children" ? T[k] : ObservableProxyPort<T[k]>;
};

export interface ElementFactoryType<S extends Element = Element> {
  contextElement?: S;
  setProperties(
    el: Element,
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  ): void;
  create<T = Node>(jsx: SingleJSXElement): T;
}
export interface CloneFactoryType<S extends Element = Element>
  extends ElementFactoryType<S> {
  clone<T = Node>(
    template: Node,
    jsx: SingleJSXElement,
    contextElement?: Element,
  ): T;
}

export type CreateFCResult<T = {}, S extends Element = Element> = (
  attrs: FCProps<T>,
  factory: ElementFactoryType<S>,
) => SingleJSXElement;

export type FC<T = {}, S extends Element = Element> = (
  attrs: T,
  factory: ElementFactoryType<S>,
) => SingleJSXElement;
export interface FCC<T = {}, S extends Element = Element>
  extends FC<T & { children?: JSX.Element }, S> {}

export type GetElementProps<El> = El extends (...args: infer Y) => any
  ? Y[0]
  : El extends {
      new (...args: infer T): any;
    }
    ? T[0]
    : El extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[El]
      : {};

export type ExtendableComponent<T> = {
  as?: T;
} & GetElementProps<T>;

// Intentionally using never - otherwise generics does not work
export type ExtendableComponentWithoutChildren<T = undefined> =
  ExtendableComponent<T> & {
    children?: never;
  };

// Re-export observable type aliases for convenience within rendering layer
export type ObservableType<Y> = ObservableProxyPort<Y>;
export type ObservablePrimitiveType<RV> = ObservableProxiedPrimitivePort<RV>;
export type ObservableArray<RV> = ObservableProxiedArray<RV>;
export type ObservableTypeOrConst<T> = ObservableProxyOrConst<T>;
export type ObservableNonNullablePrimitiveType = ObservableNonNullableProxiedPrimitiveType;
export type Unproxify<T> = UnproxifyPort<T>;

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
