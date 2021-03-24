import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface optgroup extends Partial<GlobalAttributes & GetAttributes<'disabled' | 'label'>>{}