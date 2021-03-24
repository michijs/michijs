
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface hr extends Partial<GlobalAttributes & GetRoles<'presentation' | 'none'>>{};