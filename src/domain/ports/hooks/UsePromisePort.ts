import type { CallableReactiveOrConst, CallableReactiveValuePort } from "#ports";

export type UsePromiseShouldWait = CallableReactiveOrConst<Promise<any>>[];

/**
 * Interface representing the result of a fetch operation.
 * @template R Type of the expected response data.
 */
export interface PromiseResult<R> {
  /**
   * The promise
   */
  promise: CallableReactiveValuePort<R>;
  /**
   * Call again the promise. Available after first call
   */
  recall(): void;
}

export interface UsePromisePort {
  <R>(
    callback: () => Promise<R>,
    shouldWait?: UsePromiseShouldWait,
  ): PromiseResult<Promise<R>>;
}
