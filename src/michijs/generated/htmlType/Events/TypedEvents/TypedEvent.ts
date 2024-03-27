export interface TypedEvent<T>
  extends Omit<
    Event,
    "returnValue" | "target" | "currentTarget" | "srcElement"
  > {
  /**
   * Returns the object to which event is dispatched (its target).
   */
  readonly target: T | null;
  /**
   * Returns the object whose event listener's callback is currently being invoked.
   */
  readonly currentTarget: T | null;
  /** @deprecated */
  readonly srcElement: T | null;
}
