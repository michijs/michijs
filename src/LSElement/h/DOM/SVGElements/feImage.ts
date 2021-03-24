import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feImage extends Partial<
    Pick<AllAttributes, 'preserveAspectRatio'>
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}