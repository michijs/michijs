import { AllAttributes } from "../DOMAttributes/AllAttributes";
import { SVGFilterPrimitiveAttributes, SVGGenericAttributes, SVGPresentationAttributes } from "../DOMAttributes/SVG";
import { GetType } from "../DOMAttributes/Utils";

export type feTurbulence = Partial<
    Pick<AllAttributes,
        'baseFrequency'
        | 'numOctaves'
        | 'seed'
        | 'stitchTiles'
    >
    & GetType<'FeTurbulence'>
    & SVGGenericAttributes
    & SVGPresentationAttributes
    & SVGFilterPrimitiveAttributes
>