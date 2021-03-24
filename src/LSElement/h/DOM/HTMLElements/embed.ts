import { GetAttributes, GetRoles, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface embed extends Partial<
    GlobalAttributes
    & GetAttributes<'height'
        | 'src'
        | 'width'
    >
    & GetType<'Embed'>
    & GetRoles<'application' | 'document' | 'img' | 'none' | 'presentation'>
>{}