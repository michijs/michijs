import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAriaAttributes, SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface path extends Partial<
    Pick<AllAttributes, 'd' | 'pathLength'>
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
>{}