import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes } from "../DOMAttributes/Utils";

export type map = Partial<
    GlobalAttributes
    & GetAttributes<'name'>
>