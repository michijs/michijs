import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAnimationTargetElementAttributes, SVGAriaAttributes, SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { GetXY } from '../DOMAttributes/Utils';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface image extends Partial<
    Pick<AllAttributes,
        'width'
        | 'height'
        | 'preserveAspectRatio'
        | 'crossorigin'
    >
    & GetXY
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
    & SVGAnimationTargetElementAttributes
>{}