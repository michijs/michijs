import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type br = Partial<GlobalAttributes & GetRoles<'none' | 'presentation'>>