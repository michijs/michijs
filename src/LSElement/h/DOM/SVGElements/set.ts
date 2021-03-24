import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAnimationAttributeTargetAttributes, SVGAnimationTimingAttributes, SVGGenericAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface set extends Partial<
    Pick<AllAttributes, 'to'>
    & SVGAnimationTimingAttributes
    & SVGAnimationAttributeTargetAttributes
    & SVGEvents
    & SVGGenericAttributes
>{}