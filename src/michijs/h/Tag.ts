import { HTMLElements, MathMLElements, SVGElements } from '@michijs/htmltype';
import {
  IterableAttrs,
  MichiCustomElement,
  PickWritable,
  StringKeyOf,
} from '../types';

export type DomInterface<E extends object> = {
  [K in StringKeyOf<E> as `_${K}`]: E[K];
};

export interface Tag<E> extends Partial<IterableAttrs<string>> {
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
  $oncreated?: (
    el: E,
    isSVG?: boolean,
    isMATHML?: boolean,
    context?: MichiCustomElement,
  ) => void;
  /**
   * Callback that is called when the element is updated
   */
  $onupdate?: (
    jsx: JSX.Element,
    el: E,
    isSVG?: boolean,
    isMATHML?: boolean,
    context?: MichiCustomElement,
  ) => void;
  _?: Partial<PickWritable<E>>;
}
