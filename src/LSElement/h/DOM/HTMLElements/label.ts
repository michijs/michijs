import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export interface label extends Partial<GlobalAttributes & GetAttributes<'for'>>{}