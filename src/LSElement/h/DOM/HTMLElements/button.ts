import { GetAttributes, GetType, GetValue, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface button extends Partial<
    GlobalAttributes
    & GetAttributes<'autofocus'
        | 'disabled'
        | 'form'
        | 'formaction'
        | 'formenctype'
        | 'formmethod'
        | 'formnovalidate'
        | 'formtarget'
        | 'name'
    >
    & GetValue
    & GetRoles<'checkbox' | 'link' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'radio' | 'switch' | 'tab'>
    & GetType<'Button'>
>{}