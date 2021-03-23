import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetXY } from "../DOMAttributes/Utils";

export type filter = Partial<
    Pick<AllAttributes,
        'width'
        | 'height'
        | 'filterUnits'
        | 'primitiveUnits'
    >
    & GetXY
    & SVGGenericAttributes
    & SVGPresentationAttributes
>