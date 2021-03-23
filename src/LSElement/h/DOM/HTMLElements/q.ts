import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type q = Partial<
    GlobalAttributes
    & GetAttributes<'cite'>
    & GetRoles
>