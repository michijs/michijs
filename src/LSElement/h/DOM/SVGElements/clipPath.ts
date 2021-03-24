import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface clipPath extends Partial<
    Pick<AllAttributes, 'clipPathUnits'>
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGPresentationAttributes
>{}