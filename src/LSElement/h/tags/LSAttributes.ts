import { PickWritable, StringKeyOf, IterableAttrs, LSCustomElement } from '../../types';

export type DomInterface<E extends object> = { [K in StringKeyOf<E> as `_${K}`]: E[K] }

export type LSAttributes<E = HTMLElement> = {
    /**
     * Children are created but not updated
     */
    $staticChildren?: boolean;
    /**
     * Children are not created or updated. Element creation/update is delegated
     */
    $doNotTouchChildren?: boolean;
    children?: JSX.Element;
    /**
     * Callback that is called when the element is created
     */
    $oncreated?: (el: E, isSVG?: boolean, context?: LSCustomElement) => void;
    /**
     * Callback that is called when the element is updated
     */
    $onupdate?: (jsx: JSX.Element, el: E, isSVG?: boolean, context?: LSCustomElement) => void
} & Partial<DomInterface<PickWritable<E>>> & IterableAttrs<string>;
