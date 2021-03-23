import { SVGCoreAttributes } from "../DOMAttributes/SVG";
import { GetXYZ } from "../DOMAttributes/Utils";

export type fePointLight = Partial<
    SVGCoreAttributes & GetXYZ
>