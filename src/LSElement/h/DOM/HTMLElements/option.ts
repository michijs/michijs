import { GetAttributes, GetValue } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface option extends Partial<
    GlobalAttributes
    & GetAttributes<'disabled' | 'label' | 'selected'>
    & GetValue
>{}