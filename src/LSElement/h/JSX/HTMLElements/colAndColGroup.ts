import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type colAndColGroup = Partial<GlobalAttributes & GetAttributes<'span'>>;
export type col = colAndColGroup;
export type colgroup = colAndColGroup;