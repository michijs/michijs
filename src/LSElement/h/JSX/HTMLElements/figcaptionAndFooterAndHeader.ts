
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type figcaptionAndFooterAndHeader = Partial<GlobalAttributes & GetRoles<'group' | 'none' | 'presentation'>>;
export type figcaption = figcaptionAndFooterAndHeader;
export type footer = figcaptionAndFooterAndHeader;
export type header = figcaptionAndFooterAndHeader;