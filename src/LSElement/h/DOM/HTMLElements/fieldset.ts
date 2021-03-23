import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type fieldset = Partial<
    GlobalAttributes
    & GetAttributes<'disabled'
        | 'form'
        | 'name'
    >
    & GetRoles<'radiogroup' | 'presentation' | 'none'>
>