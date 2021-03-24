import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles, GetValue } from "../DOMAttributes/Utils";

export interface data extends Partial<
    GlobalAttributes
    & GetValue
    & GetRoles
>{}