import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type th = Partial<
    GlobalAttributes
    & GetAttributes<'abbr'
        | 'colspan'
        | 'headers'
        | 'rowspan'
        | 'scope'
    >
    & GetRoles
>