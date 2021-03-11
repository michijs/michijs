import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type base = Partial<GlobalAttributes & GetAttributes<'href'
    | 'target'
>>