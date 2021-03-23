import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationTargetElementAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type linearGradient = Partial<
    Pick<AllAttributes,
        'gradientUnits'
        | 'gradientTransform'
        | 'spreadMethod'
        | 'x1'
        | 'x2'
        | 'y1'
        | 'y2'
    >
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAnimationTargetElementAttributes
>