import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface blockquote extends Partial<
    GlobalAttributes
    & GetAttributes<'cite'>
    & GetRoles
>{}