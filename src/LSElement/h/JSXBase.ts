type ComponentChild = JSX.Element | string | number | boolean | undefined | null;
type ComponentChildren = ComponentChild | ComponentChild[];

type ElementCSSInlineStyle = {
    readonly style?: Partial<CSSStyleDeclaration>;
}
type ElementChildrenAttribute = {
    children?: ComponentChildren[] | ComponentChildren;
}

export type HTMLAttributes = { [K in keyof HTMLElementTagNameMap]?: Omit<Partial<HTMLElementTagNameMap[K]>, 'children' | 'style'> & ElementChildrenAttribute & ElementCSSInlineStyle };
export type SVGAttributes = {
    [K in keyof SVGElementTagNameMap]?: Omit<Partial<SVGElementTagNameMap[K]>, 'children' | 'style'> & ElementChildrenAttribute & ElementCSSInlineStyle
}
export type HTMLElementAttributes = Omit<Partial<HTMLElement>, 'children' | 'style'> & ElementChildrenAttribute & ElementCSSInlineStyle;
export type HTMLAttributesWithMandatoryId = { [K in keyof HTMLAttributes]: HTMLAttributes[K] & { id: string } };
export type SVGAttributesWithMandatoryId = { [K in keyof SVGAttributes]: SVGAttributes[K] } & { id: string };
export type HTMLElementAttributesWithMandatoryId = { [K in keyof HTMLElementAttributes]: HTMLElementAttributes[K] } & { id: string };

declare global {
    export namespace JSX {
        type Element = HTMLElement;

        type InteralSVGAttributesWithMandatoryId = { [K in keyof SVGAttributes]: SVGAttributes[K] & { id: string } };
        type IntrinsicElementsHTML = HTMLAttributesWithMandatoryId & InteralSVGAttributesWithMandatoryId;

        interface IntrinsicElements extends IntrinsicElementsHTML { }
    }
}
