import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetDxAndDy } from "../DOMAttributes/Utils";

export type feOffset = Partial<
    Pick<AllAttributes,'in'>
    & GetDxAndDy
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>