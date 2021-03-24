import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface br extends Partial<
    GlobalAttributes
    & GetRoles<'none' | 'presentation'>
>{}