import { SVGAnimationAdditionAttributes, SVGAnimationAttributeTargetAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGGenericAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export interface animate extends Partial<SVGGenericAttributes
    & SVGEvents
    & SVGAnimationAttributeTargetAttributes
    & SVGAnimationTimingAttributes
    & SVGAnimationAdditionAttributes
    & SVGAnimationValueAttributes
>{}