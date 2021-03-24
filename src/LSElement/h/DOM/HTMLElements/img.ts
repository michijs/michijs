import { GetAttributes, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

type imgType = Partial<
    GlobalAttributes
    & GetAttributes<
        'alt'
        | 'crossorigin'
        | 'decoding'
        | 'height'
        | 'ismap'
        | 'loading'
        | 'referrerpolicy'
        | 'sizes'
        | 'srcset'
        | 'width'
        | 'usemap'
    >
    & GetRoles<
        //TODO: make this rules:
        //with non-empty alt attribute
        'button'
        | 'checkbox'
        | 'link'
        | 'menuitem'
        | 'menuitemcheckbox'
        | 'menuitemradio'
        | 'option'
        | 'progressbar'
        | 'scrollbar'
        | 'separator'
        | 'slider'
        | 'switch'
        | 'tab'
        | 'treeitem'
        //with empty alt attribute
        | 'none'
        | 'presentation'
    //with no alt attribute, no role permitted
    >
> & GetAttributes<'src'>

export interface img extends imgType { }