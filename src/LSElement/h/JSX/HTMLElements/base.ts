import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type base = Partial<GlobalAttributes & GetAttributes<'href'
    | 'target'
>>