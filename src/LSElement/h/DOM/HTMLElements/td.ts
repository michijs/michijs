import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type td = Partial<
    GlobalAttributes
    & GetAttributes<'colspan' | 'headers' | 'rowspan'>
    & GetRoles
>