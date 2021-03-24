import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface canvas extends Partial<
    GlobalAttributes
    & GetAttributes<'width' | 'height'>
    & GetRoles
>{}