import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';

export interface select extends Partial<
    GlobalAttributes
    & GetAttributes<'autocomplete'
        | 'autofocus'
        | 'disabled'
        | 'form'
        | 'multiple'
        | 'name'
        | 'required'
        | 'size'
    >
    /**
    * TODO: menu with no multiple attribute and no size attribute greater than 1, otherwise no role permitted
    */
    & GetRoles<'menu'>
>{}