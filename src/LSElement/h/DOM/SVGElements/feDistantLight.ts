import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGCoreAttributes } from "../DOMAttributes/SVG";

export type feDistantLight = Partial<
    Pick<AllAttributes, 'azimuth' | 'elevation'> & SVGCoreAttributes
>