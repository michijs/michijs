
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetRoles } from '../DOMAttributes/Utils';

 type figcaptionAndFooterAndHeader = Partial<GlobalAttributes & GetRoles<'group' | 'none' | 'presentation'>>;
export interface figcaption extends figcaptionAndFooterAndHeader{}
export interface footer extends figcaptionAndFooterAndHeader{}
export interface header extends figcaptionAndFooterAndHeader{}