import { SVGGenericAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export interface desc extends Partial<
    & SVGGenericAttributes
    & SVGEvents
>{}