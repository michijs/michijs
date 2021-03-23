import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type output = Partial<
    GlobalAttributes
    & GetAttributes<'for' | 'form' | 'name'>
    & GetRoles
>