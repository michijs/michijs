import { GetAttributes, GetValue } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type param = Partial<
    GlobalAttributes
    & GetAttributes<'name'>
    & GetValue
>