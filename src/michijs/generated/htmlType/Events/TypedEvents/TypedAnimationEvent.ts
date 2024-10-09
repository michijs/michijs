import type { TypedEvent } from "./TypedEvent";
export interface TypedAnimationEvent<T> extends TypedEvent<T> {
  readonly animationName: string;
  readonly elapsedTime: number;
  readonly pseudoElement: string;
}
