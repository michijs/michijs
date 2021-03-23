import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes } from "../DOMAttributes/Utils";

export type slot = Partial<GlobalAttributes & GetAttributes<'name'>>