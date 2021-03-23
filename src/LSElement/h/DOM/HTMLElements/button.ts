import { GetAttributes, GetType, GetValue } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type button = Partial<
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
>