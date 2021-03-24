import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface feDiffuseLighting extends Partial<
    Pick<AllAttributes,
        'in'
        | 'surfaceScale'
        | 'diffuseConstant'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}