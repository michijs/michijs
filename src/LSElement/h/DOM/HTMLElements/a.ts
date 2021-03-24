import { GetAttributes, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface a extends Partial<
    GlobalAttributes
    & GetAttributes<'download'
        | 'href'
        | 'hreflang'
        | 'ping'
        | 'rel'
        | 'target'
    > & GetType<'A'>
    & GetRoles<'button'
        | 'checkbox'
        | 'menuitem'
        | 'menuitem'
        | 'menuitemcheckbox'
        | 'menuitemradio'
        | 'option'
        | 'radio'
        | 'switch'
        | 'tab'
        | 'treeitem'
    >
>{}