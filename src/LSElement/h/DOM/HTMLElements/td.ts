import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface td extends Partial<
    GlobalAttributes
    & GetAttributes<'colspan' | 'headers' | 'rowspan'>
    & GetRoles
>{}