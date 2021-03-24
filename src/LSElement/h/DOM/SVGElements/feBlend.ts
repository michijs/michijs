import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feBlend extends Partial<
    Pick<AllAttributes, 'in' | 'in2' | 'mode'>
    & SVGGenericAttributes
    & SVGFilterPrimitiveAttributes
    & SVGPresentationAttributes
>{}