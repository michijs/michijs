import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type dt = Partial<GlobalAttributes & GetRoles<'listitem'>>