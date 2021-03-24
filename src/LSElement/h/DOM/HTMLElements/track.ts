import { GetAttributes } from '../DOMAttributes/Utils';
import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';

export interface track extends Partial<
    GlobalAttributes
    & GetAttributes<'default'
        | 'kind'
        | 'label'
        | 'src'
        | 'srclang'
    >
>{}