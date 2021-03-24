import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes, GetMinAndMax, GetValue } from "../DOMAttributes/Utils";

export interface meter extends Partial<
    GlobalAttributes
    & GetAttributes<'high'
        | 'low'
        | 'optimum'
        | 'form'
    >
    & GetValue<number>
    & GetMinAndMax<number>
>{}