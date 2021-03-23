import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes, GetType } from "../DOMAttributes/Utils";

export type style = Partial<
    GlobalAttributes
    & GetAttributes<'media' | 'nonce' | 'title'>
    & GetType<'Style'>
>