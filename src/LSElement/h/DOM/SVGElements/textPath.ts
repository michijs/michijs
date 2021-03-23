import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAriaAttributes, SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type textPath = Partial<
    Pick<AllAttributes,
        'dx'
        | 'dy'
        | 'rotate'
        | 'lengthAdjust'
        | 'textLength'
    >
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
>