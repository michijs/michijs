import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationTargetElementAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type radialGradient = Partial<
    Pick<AllAttributes,
        'cx'
        | 'cy'
        | 'fr'
        | 'fx'
        | 'fy'
        | 'gradientUnits'
        | 'gradientTransform'
        | 'r'
        | 'spreadMethod'
    >
    & SVGAnimationTargetElementAttributes
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
>