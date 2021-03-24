import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGCoreAttributes } from '../DOMAttributes/SVG';

export interface feMergeNode extends Partial<
    Pick<AllAttributes, 'in'>
    & SVGCoreAttributes
>{}