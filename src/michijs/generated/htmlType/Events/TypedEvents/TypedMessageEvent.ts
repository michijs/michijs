import { TypedEvent } from "./TypedEvent";
/** A message received by a target object. */
export interface TypedMessageEvent<T, D = unknown> extends TypedEvent<T> {
  /**
   * Returns the data of the message.
   */
  readonly data: D;
  /**
   * Returns the last event ID string, for server-sent events.
   */
  readonly lastEventId: string;
  /**
   * Returns the origin of the message, for server-sent events and cross-document messaging.
   */
  readonly origin: string;
  /**
   * Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.
   */
  readonly ports: ReadonlyArray<MessagePort>;
  /**
   * Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.
   */
  readonly source: MessageEventSource | null;
  /** @deprecated */
  initMessageEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    data?: unknown,
    origin?: string,
    lastEventId?: string,
    source?: MessageEventSource | null,
    ports?: MessagePort[],
  ): void;
}
