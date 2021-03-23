import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type video = Partial<
    GlobalAttributes
    & GetAttributes<'autoplay'
        | 'controls'
        | 'crossorigin'
        | 'height'
        | 'loop'
        | 'muted'
        | 'playsinline'
        | 'poster'
        | 'preload'
        | 'src'
        | 'width'
    >
    & GetRoles<'application'>
>