import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface blockquote extends Partial<
    GlobalAttributes
    & GetAttributes<'cite'>
    & GetRoles
>{}