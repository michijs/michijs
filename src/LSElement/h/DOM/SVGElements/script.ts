import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationTargetElementAttributes, SVGGenericAttributes } from "../DOMAttributes/SVG";
import { GetType } from "../DOMAttributes/Utils";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export interface script extends Partial<
    Pick<AllAttributes, 'crossorigin'>
    & GetType<'Script'>
    & SVGAnimationTargetElementAttributes
    & SVGGenericAttributes
    & SVGEvents
>{}