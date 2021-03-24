import { AllAttributes } from '../DOMAttributes/AllAttributes';
import { SVGAriaAttributes, SVGGenericAttributes, SVGPresentationAttributes } from '../DOMAttributes/SVG';
import { GetXY } from '../DOMAttributes/Utils';
import { SVGEvents } from '../DOMEvents/SVGEvents';

export interface _symbol extends Partial<
    Pick<AllAttributes,
        'height'
        | 'preserveAspectRatio'
        | 'refX'
        | 'refY'
        | 'viewBox'
        | 'width'
    >
    & GetXY
    & SVGGenericAttributes
    & SVGEvents
    & SVGPresentationAttributes
    & SVGAriaAttributes
>{}