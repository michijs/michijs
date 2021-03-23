import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetMax, GetValue } from "../DOMAttributes/Utils";

export type progress = Partial<
    GlobalAttributes
    & GetValue<number>
    & GetMax<number>
>