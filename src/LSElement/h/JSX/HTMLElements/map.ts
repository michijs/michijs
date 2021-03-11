import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes } from "../DOMAttributes/utils";

export type map = Partial<GlobalAttributes & GetAttributes<'name'>>