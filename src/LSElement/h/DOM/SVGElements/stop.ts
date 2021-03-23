import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type stop = Partial<
    Pick<AllAttributes, 'offset'>
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
>