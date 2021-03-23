import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export type feConvolveMatrix = Partial<
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
>