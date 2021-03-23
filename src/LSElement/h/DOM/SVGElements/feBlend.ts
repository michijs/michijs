import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export type feBlend = Partial<
    Pick<AllAttributes, 'in' | 'in2' | 'mode'>
    & SVGGenericAttributes
    & SVGFilterPrimitiveAttributes
    & SVGPresentationAttributes
>