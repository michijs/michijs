

import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type headingElement = Partial<GlobalAttributes & GetRoles<'tab' | 'presentation' | 'none'>>;
export type h1 = headingElement;
export type h2 = headingElement;
export type h3 = headingElement;
export type h4 = headingElement;
export type h5 = headingElement;
export type h6 = headingElement;