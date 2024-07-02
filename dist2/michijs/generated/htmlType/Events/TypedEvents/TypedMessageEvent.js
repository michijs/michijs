/**
 * @typedef {import('./TypedEvent').TypedEvent} TypedEvent
 */

/**
 * A message received by a target object.
 * @template T
 * @template [D = unknown]
 * @typedef {object} TypedMessageEvent
 * @property {D} data Returns the data of the message.
 * @property {string} lastEventId Returns the last event ID string, for server-sent events.
 * @property {string} origin Returns the origin of the message, for server-sent events and cross-document messaging.
 * @property {ReadonlyArray<MessagePort>} ports Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.
 * @property {MessageEventSource | null} source Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.
 * @property {(type: string, bubbles?: boolean, cancelable?: boolean, data?: unknown, origin?: string, lastEventId?: string, source?: MessageEventSource | null, ports?: MessagePort[]) => void} initMessageEvent
 */
