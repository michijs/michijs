import { GetAttributes, GetType, GetRoles } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

type ObjectType = Partial<
    GlobalAttributes
    & GetAttributes<
        'form'
        | 'height'
        | 'name'
        | 'typemustmatch'
        | 'usemap'
        | 'width'
    >
    & GetRoles<'application' | 'document' | 'img'>
> & GetType<'Object'> & GetAttributes<'data'>

export interface _object extends ObjectType { }