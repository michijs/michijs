
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type commonElement = Partial<GlobalAttributes & GetRoles>

export type address = commonElement;
export type abbr = commonElement;
export type b = commonElement;
export type bdi = commonElement;
export type bdo = commonElement;
export type cite = commonElement;
export type code = commonElement;
export type dfn = commonElement;
export type div = commonElement;
export type em = commonElement;
export type figure = commonElement;
export type i = commonElement;
export type kbd = commonElement;
export type mark = commonElement;