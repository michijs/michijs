import { SVGCoreAttributes, SVGTransferFunctionAttributes } from "../DOMAttributes/SVG";

type feFunc = Partial<
    & SVGCoreAttributes
    & SVGTransferFunctionAttributes<'FeFunc'>
>

export type feFuncA = feFunc;
export type feFuncB = feFunc;
export type feFuncG = feFunc;
export type feFuncR = feFunc;