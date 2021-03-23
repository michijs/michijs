import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type dl = Partial<GlobalAttributes & GetRoles<'group' | 'list' | 'none' | 'presentation'>>