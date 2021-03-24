import { SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export interface defs extends Partial<
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
>{}