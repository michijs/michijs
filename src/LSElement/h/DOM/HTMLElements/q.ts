import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface q extends Partial<
    GlobalAttributes
    & GetAttributes<'cite'>
    & GetRoles
>{}