import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type iframe = Partial<GlobalAttributes & GetAttributes<'allow'
    | 'height'
    | 'name'
    | 'referrerpolicy'
    | 'sandbox'
    | 'src'
    | 'srcdoc'
    | 'width'
> & GetRoles<'application' | 'document' | 'img' | 'none' | 'presentation'>>