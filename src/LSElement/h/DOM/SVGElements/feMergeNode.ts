import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGCoreAttributes } from "../DOMAttributes/SVG";

export type feMergeNode = Partial<
    Pick<AllAttributes, 'in'>
    & SVGCoreAttributes
>