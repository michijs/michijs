

import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetRoles } from '../DOMAttributes/Utils';

export type headingElement = Partial<GlobalAttributes & GetRoles<'tab' | 'presentation' | 'none'>>;
export interface h1 extends headingElement{}
export interface h2 extends headingElement{}
export interface h3 extends headingElement{}
export interface h4 extends headingElement{}
export interface h5 extends headingElement{}
export interface h6 extends headingElement{}