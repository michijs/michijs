import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface output extends Partial<
    GlobalAttributes
    & GetAttributes<'for' | 'form' | 'name'>
    & GetRoles
>{}