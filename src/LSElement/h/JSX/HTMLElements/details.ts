import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type details = Partial<GlobalAttributes & GetAttributes<'open'>>