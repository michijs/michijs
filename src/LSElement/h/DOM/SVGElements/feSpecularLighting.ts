import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feSpecularLighting extends Partial<
    Pick<AllAttributes,
        'in'
        | 'surfaceScale'
        | 'specularConstant'
        | 'specularExponent'
    >
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}