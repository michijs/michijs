import { SVGCoreAttributes, SVGTransferFunctionAttributes } from "../DOMAttributes/SVG";

type feFunc = Partial<
    & SVGCoreAttributes
    & SVGTransferFunctionAttributes<'FeFunc'>
>

export interface feFuncA extends feFunc{};
export interface feFuncB extends feFunc{};
export interface feFuncG extends feFunc{};
export interface feFuncR extends feFunc{};