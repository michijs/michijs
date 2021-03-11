import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";
import { MIMEType } from "../DOMAttributes/types";

export type _object = Partial<GlobalAttributes & GetAttributes<
    'form'
    | 'height'
    | 'name'
    | 'typemustmatch'
    | 'usemap'
    |'width'
>  & GetRoles<'application' | 'document' | 'img'
>> & {
    /**
     * The content type of the resource specified by data. At least one of data and type must be defined.
     */
    type: MIMEType;
} & GetAttributes<'data'>