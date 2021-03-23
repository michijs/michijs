import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export type feSpecularLighting = Partial<
    Pick<AllAttributes,
        'in'
        | 'surfaceScale'
        | 'specularConstant'
        | 'specularExponent'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>