import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface time extends Partial<
    GlobalAttributes
    & GetAttributes<'datetime'>
    & GetRoles
>{}