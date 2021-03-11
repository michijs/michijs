import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type q = Partial<GlobalAttributes& GetAttributes<'cite'>>