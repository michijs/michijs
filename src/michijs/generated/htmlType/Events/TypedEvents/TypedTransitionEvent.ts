import type { TypedEvent } from "./TypedEvent";
/** Events providing information related to transitions. */
export interface TypedTransitionEvent<T> extends TypedEvent<T> {
  readonly elapsedTime: number;
  readonly propertyName: string;
  readonly pseudoElement: string;
}
