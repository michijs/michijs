import type { CallableReactiveOrConst, ReactiveValuePort } from "@ports";

type usePromiseShouldWait = CallableReactiveOrConst<Promise<any>>[];


/**
 * Interface representing the result of a fetch operation.
 * @template R Type of the expected response data.
 */
interface PromiseResult<R> {
  /**
   * The promise
   */
  promise: ReactiveValuePort<R>;
  /**
   * Call again the promise. Available after first call
   */
  recall(): void;
}

export interface UsePromisePort {
  <R>(
    callback: () => Promise<R>,
    shouldWait?: usePromiseShouldWait,
  ): PromiseResult<Promise<R>>;
}