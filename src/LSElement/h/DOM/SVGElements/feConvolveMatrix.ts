import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface feConvolveMatrix extends Partial<
    Pick<AllAttributes,
        'in'
        | 'order'
        | 'kernelMatrix'
        | 'divisor'
        | 'bias'
        | 'targetX'
        | 'targetY'
        | 'edgeMode'
        | 'preserveAlpha'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}