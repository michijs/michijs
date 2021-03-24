import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { SVGEvents } from '../DOMEvents/SVGEvents';
import { a as HTMLA } from '../HTMLElements/a';

export interface a extends Partial<
    Omit<HTMLA, keyof GlobalAttributes>
    & SVGGenericAttributes
    & SVGEvents
    & SVGConditionalProcessingAttributes
    & SVGPresentationAttributes
>{}