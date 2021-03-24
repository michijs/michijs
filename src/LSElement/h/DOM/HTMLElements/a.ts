import { GetAttributes, GetType, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

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