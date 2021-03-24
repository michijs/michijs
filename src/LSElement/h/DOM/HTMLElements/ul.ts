import { GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface ul extends Partial<
    GlobalAttributes
    & GetRoles<'directory' | 'group' | 'listbox' | 'menu' | 'menubar' | 'none' | 'presentation' | 'radiogroup' | 'tablist' | 'toolbar' | 'tree'>
>{}