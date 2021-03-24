import { SVGCoreAttributes } from "../DOMAttributes/SVG";
import { GetXYZ } from "../DOMAttributes/Utils";

export interface fePointLight extends Partial<
    SVGCoreAttributes & GetXYZ
>{}