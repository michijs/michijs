import { GlobalAttributes } from '../DOMAttributes/GlobalAttributes';
import { GetAttributes, GetType } from '../DOMAttributes/Utils';

export interface source extends Partial<
    GlobalAttributes
    & GetAttributes<'media' | 'sizes' | 'src' | 'srcset'>
    & GetType<'Source'>
>{}