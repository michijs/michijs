import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface details extends Partial<GlobalAttributes & GetAttributes<'open'>>{}