import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

type colAndColGroup = Partial<GlobalAttributes & GetAttributes<'span'>>;
export interface col extends colAndColGroup{}
export interface colgroup extends colAndColGroup{}