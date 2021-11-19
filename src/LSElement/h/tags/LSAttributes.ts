import { IterableAttrs, PickWritable, StringKeyOf } from '../../types';

export type DomInterface<E extends object> = { [K in StringKeyOf<E> as `_${K}`]: E[K] }

export type LSAttributes<E = HTMLElement> = {
    children?: JSX.Element;
} & Partial<DomInterface<PickWritable<E>>> & IterableAttrs;
