import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAriaAttributes, SVGCoreAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface view extends Partial<
    Pick<AllAttributes, 'viewBox' | 'preserveAspectRatio'>
    & SVGCoreAttributes
    & SVGEvents
    & SVGAriaAttributes
>{}