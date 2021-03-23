import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type mod = Partial<
    GlobalAttributes
    & GetAttributes<'cite' | 'datetime'>
    & GetRoles
>
export type ins = mod
export type del = mod