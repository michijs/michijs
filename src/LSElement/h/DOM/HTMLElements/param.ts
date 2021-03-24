import { GetAttributes, GetValue } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface param extends Partial<
    GlobalAttributes
    & GetAttributes<'name'>
    & GetValue
>{}