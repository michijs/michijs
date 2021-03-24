import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feGaussianBlur extends Partial<
    Pick<AllAttributes,
        'in'
        | 'stdDeviation'
        | 'edgeMode'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}