import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export type clipPath = Partial<
    Pick<AllAttributes, 'clipPathUnits'>
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGPresentationAttributes
>