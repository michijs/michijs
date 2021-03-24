import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feComposite extends Partial<
    Pick<AllAttributes, 'in' | 'in2' | 'operator' | 'k1' | 'k2' | 'k3' | 'k4'>
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}