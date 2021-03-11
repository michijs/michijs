import { GetAttributes, GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type insAndDel = Partial<GlobalAttributes & GetAttributes<'cite' | 'datetime'> & GetRoles>
export type ins = insAndDel
export type del = insAndDel