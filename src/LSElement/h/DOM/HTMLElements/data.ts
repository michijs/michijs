import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles, GetValue } from "../DOMAttributes/Utils";

export type data = Partial<
    GlobalAttributes
    & GetValue
    & GetRoles
>