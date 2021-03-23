import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetType, GetValues } from "../DOMAttributes/Utils";

export type feColorMatrix = Partial<
    Pick<AllAttributes, 'in'>
    /**
     * TODO: Default value	If type="matrix", identity matrix,
if type="saturate", 1, resulting in identity matrix,
if type="hueRotate", 0, resulting in identity matrix
     */
    & GetValues
    & GetType<'FeColorMatrix'>
    & SVGGenericAttributes
    & SVGFilterPrimitiveAttributes
    & SVGPresentationAttributes
>