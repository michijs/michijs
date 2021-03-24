import { GetAttributes, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

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