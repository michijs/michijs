
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type hr = Partial<GlobalAttributes & GetRoles<'presentation' | 'none'>>;