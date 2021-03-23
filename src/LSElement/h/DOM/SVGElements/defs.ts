import { SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type defs = Partial<
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
>