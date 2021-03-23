import { GetAttributes, GetValue } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type option = Partial<
    GlobalAttributes
    & GetAttributes<'disabled' | 'label' | 'selected'>
    & GetValue
>