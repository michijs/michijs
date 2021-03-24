import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGCoreAttributes } from "../DOMAttributes/SVG";
import { GetXYZ } from "../DOMAttributes/Utils";

export interface feSpotLight extends Partial<
    Pick<AllAttributes,
        'pointsAtX'
        | 'pointsAtY'
        | 'pointsAtZ'
        | 'specularExponent'
        | 'limitingConeAngle'>
    & SVGCoreAttributes
    & GetXYZ
>{}