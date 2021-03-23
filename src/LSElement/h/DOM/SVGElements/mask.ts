import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetXY } from "../DOMAttributes/Utils";

export type mask = Partial<
    Pick<AllAttributes,
        'height'
        | 'maskContentUnits'
        | 'maskUnits'
        | 'width'
    >
    & GetXY
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGPresentationAttributes
>