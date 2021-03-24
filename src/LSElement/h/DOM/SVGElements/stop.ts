import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface stop extends Partial<
    Pick<AllAttributes, 'offset'>
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
>{}