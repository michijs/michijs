import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';

export interface feTile extends Partial<
    Pick<AllAttributes,'in'>
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}