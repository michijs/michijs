import { GetAttributes, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type _object = Partial<
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