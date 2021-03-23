import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes, GetType } from "../DOMAttributes/Utils";

export type script = Partial<
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
>