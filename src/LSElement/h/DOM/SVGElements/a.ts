import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";
import { a as HTMLA } from '../HTMLElements/a';

export type a = Partial<
    Omit<HTMLA, keyof GlobalAttributes>
    & SVGGenericAttributes
    & SVGEvents
    & SVGConditionalProcessingAttributes
    & SVGPresentationAttributes
>