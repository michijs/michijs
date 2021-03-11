import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type details = Partial<GlobalAttributes & GetAttributes<'open'>>