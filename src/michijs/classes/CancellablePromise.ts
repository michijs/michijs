/**
 * A class that wraps a Promise and adds cancellation support.
 *
 * When cancelled, the promise resolves immediately, skipping the callback.
 */
export class CancellablePromise<T = any> {
  /**
   * Creates a cancellable promise.
   *
   * @param promise The original promise to wrap.
   * @param callback A callback to handle the resolved value, unless cancelled.
   */
  constructor(
    abortController: AbortController,
    promise: Promise<T>,
    callback: (result: T) => void,
  ) {
    const fakePromise = Promise.withResolvers<T>();
    abortController.signal.onabort = () => fakePromise.resolve();
    Promise.race([promise, fakePromise.promise])
      .then((result) => {
        if (!abortController.signal.aborted) callback(result);
      })
      .catch((error) => {
        if (!abortController.signal.aborted) throw error; // Rethrow error if not cancelled
      });
  }
}
