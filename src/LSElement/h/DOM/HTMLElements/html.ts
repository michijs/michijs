import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface html extends Partial<GlobalAttributes& GetAttributes<'xmlns'>>{}