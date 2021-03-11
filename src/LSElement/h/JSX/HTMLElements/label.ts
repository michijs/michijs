import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type label = Partial<GlobalAttributes & GetAttributes<'for'>>