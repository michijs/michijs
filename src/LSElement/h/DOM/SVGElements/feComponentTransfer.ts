import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";

export interface feComponentTransfer extends Partial<
    Pick<AllAttributes, 'in'>
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}