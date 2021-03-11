import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/utils";

export type dt = Partial<GlobalAttributes & GetRoles<'listitem'>>