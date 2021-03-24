import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetMax, GetValue } from "../DOMAttributes/Utils";

export interface progress extends Partial<
    GlobalAttributes
    & GetValue<number>
    & GetMax<number>
>{}