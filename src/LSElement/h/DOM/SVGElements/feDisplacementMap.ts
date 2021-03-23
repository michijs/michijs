import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export type feDisplacementMap = Partial<
    Pick<AllAttributes,
        'in'
        | 'in2'
        | 'scale'
        | 'xChannelSelector'
        | 'yChannelSelector'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>