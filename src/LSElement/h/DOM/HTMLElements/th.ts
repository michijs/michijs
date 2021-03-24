import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface th extends Partial<
    GlobalAttributes
    & GetAttributes<'abbr'
        | 'colspan'
        | 'headers'
        | 'rowspan'
        | 'scope'
    >
    & GetRoles
>{}