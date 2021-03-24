import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetDxAndDy } from "../DOMAttributes/Utils";

export interface feOffset extends Partial<
    Pick<AllAttributes,'in'>
    & GetDxAndDy
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>{}