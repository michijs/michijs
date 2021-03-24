import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface base extends Partial<
    GlobalAttributes
    & GetAttributes<'href'| 'target'>
>{}