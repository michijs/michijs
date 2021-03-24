import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface feMerge extends Partial<
    SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}