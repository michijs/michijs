import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGCoreAttributes } from "../DOMAttributes/SVG";

export interface feDistantLight extends Partial<
    Pick<AllAttributes, 'azimuth' | 'elevation'> & SVGCoreAttributes
>{}