import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type time = Partial<
    GlobalAttributes
    & GetAttributes<'datetime'>
    & GetRoles
>