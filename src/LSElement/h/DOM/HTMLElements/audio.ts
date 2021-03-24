import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface audio extends Partial<
    GlobalAttributes
    & GetAttributes<'autoplay'
        | 'controls'
        | 'crossorigin'
        | 'loop'
        | 'muted'
        | 'preload'
        | 'src'
    >
    & GetRoles<'application'>
>{}