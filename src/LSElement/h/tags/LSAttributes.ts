import { PickWritable, StringKeyOf, IterableAttrs } from '../../types';

export type DomInterface<E extends object> = { [K in StringKeyOf<E> as `_${K}`]: E[K] }

export type LSAttributes<E = HTMLElement> = {
    staticChildren?: boolean;
    children?: JSX.Element;
    oncreated?: (el: E) => void
} & Partial<DomInterface<PickWritable<E>>> & IterableAttrs;
