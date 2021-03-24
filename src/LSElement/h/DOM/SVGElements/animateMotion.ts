import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAnimationAdditionAttributes, SVGAnimationAttributeTargetAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGGenericAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface animateMotion extends Partial<
    Pick<AllAttributes, 'keyPoints' | 'path' | 'rotate'>
    & SVGGenericAttributes
    & SVGEvents
    & SVGAnimationAttributeTargetAttributes
    & SVGAnimationTimingAttributes
    & SVGAnimationValueAttributes
    & SVGAnimationAdditionAttributes
>{}