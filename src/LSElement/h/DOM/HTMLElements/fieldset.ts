import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface fieldset extends Partial<
    GlobalAttributes
    & GetAttributes<'disabled'
        | 'form'
        | 'name'
    >
    & GetRoles<'radiogroup' | 'presentation' | 'none'>
>{}