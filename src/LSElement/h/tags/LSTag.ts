import type { GlobalAttributes } from '@lsegurado/htmltype/Attributes';
import type { LSAttributes } from './LSAttributes';

export type LSTag<T extends { id?: string } = GlobalAttributes, E = HTMLElement> = T &
    LSAttributes<E>
