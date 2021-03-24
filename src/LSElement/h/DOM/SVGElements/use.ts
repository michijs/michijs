import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationTargetElementAttributes, SVGAriaAttributes, SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetXY } from "../DOMAttributes/Utils";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export interface use extends Partial<
    Pick<AllAttributes, 'width' | 'height'>
    & GetXY
    & SVGAnimationTargetElementAttributes
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
>{}