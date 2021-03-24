import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetAttributes, GetType } from '../DOMAttributes/Utils';

export interface script extends Partial<
    GlobalAttributes
    & GetAttributes<'async'
        | 'crossorigin'
        | 'defer'
        | 'integrity'
        | 'nomodule'
        | 'nonce'
        | 'referrerpolicy'
        | 'src'
    >
    & GetType<'Script'>
>{}