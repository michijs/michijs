import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface dt extends Partial<GlobalAttributes & GetRoles<'listitem'>>{}