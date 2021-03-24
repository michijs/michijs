import { GetRoles, GetValue } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface li extends Partial<
    GlobalAttributes
    & GetValue<number>
    & GetRoles<'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'option' | 'none' | 'presentation' | 'radio' | 'separator' | 'tab' | 'treeitem'>
>{}