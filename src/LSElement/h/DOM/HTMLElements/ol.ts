import { GetAttributes, GetRoles, GetType } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface ol extends Partial<
    GlobalAttributes
    & GetType<'Ol'>
    & GetAttributes<'reversed' | 'start'>
    & GetRoles<'directory' | 'group' | 'listbox' | 'menu' | 'menubar' | 'none' | 'presentation' | 'radiogroup' | 'tablist' | 'toolbar' | 'tree'>
>{}