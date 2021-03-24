import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface feMorphology extends Partial<
    Pick<AllAttributes,
        'in'
        | 'operator'
        | 'radius'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}