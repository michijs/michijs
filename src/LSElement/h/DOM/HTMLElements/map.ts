import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes } from "../DOMAttributes/Utils";

export interface map extends Partial<
    GlobalAttributes
    & GetAttributes<'name'>
>{}