import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGAnimationTargetElementAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { SVGEvents } from "../DOMEvents/SVGEvents";

export type marker = Partial<
    Pick<AllAttributes,
        'markerHeight'
        | 'markerUnits'
        | 'markerWidth'
        | 'orient'
        | 'preserveAspectRatio'
        | 'refX'
        | 'refY'
        | 'viewBox'
    >
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAnimationTargetElementAttributes
>