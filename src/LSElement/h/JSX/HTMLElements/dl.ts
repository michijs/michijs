import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/utils";

export type dl = Partial<GlobalAttributes & GetRoles<'group' | 'list' | 'none' | 'presentation'>>