import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes, GetType } from "../DOMAttributes/Utils";

export interface style extends Partial<
    GlobalAttributes
    & GetAttributes<'media' | 'nonce' | 'title'>
    & GetType<'Style'>
>{}