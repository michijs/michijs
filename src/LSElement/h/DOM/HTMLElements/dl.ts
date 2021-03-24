import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetRoles } from '../DOMAttributes/Utils';

export interface dl extends Partial<GlobalAttributes & GetRoles<'group' | 'list' | 'none' | 'presentation'>>{}