import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type audio = Partial<GlobalAttributes & GetAttributes<'autoplay'
    | 'controls'
    | 'crossorigin'
    | 'loop'
    | 'muted'
    | 'preload'
    | 'src'
> & GetRoles<'application'>>