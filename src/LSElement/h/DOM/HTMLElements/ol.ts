import { GetAttributes, GetRoles, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type ol = Partial<
    GlobalAttributes
    & GetType<'Ol'>
    & GetAttributes<'reversed' | 'start'>
    & GetRoles<'directory' | 'group' | 'listbox' | 'menu' | 'menubar' | 'none' | 'presentation' | 'radiogroup' | 'tablist' | 'toolbar' | 'tree'>
>