import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationAdditionAttributes, SVGAnimationAttributeTargetAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGConditionalProcessingAttributes, SVGCoreAttributes } from "../DOMAttributes/SVG";
import { GetType } from "../DOMAttributes/Utils";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type animateTransform = Partial<
    Pick<AllAttributes, 'by' | 'from' | 'to'>
    & SVGConditionalProcessingAttributes
    & SVGCoreAttributes
    & SVGEvents
    & SVGAnimationAttributeTargetAttributes
    & SVGAnimationTimingAttributes
    & SVGAnimationValueAttributes
    & SVGAnimationAdditionAttributes
    & GetType<'AnimateTransform'>
>