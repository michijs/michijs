import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAriaAttributes, SVGConditionalProcessingAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { GetXY } from '../DOMAttributes/Utils';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface svg extends Partial<
    Pick<AllAttributes,
        'height'
        | 'preserveAspectRatio'
        | 'viewBox'
        | 'width'
    >
    & GetXY
    & SVGGenericAttributes
    & SVGConditionalProcessingAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
>{}