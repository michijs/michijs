import type { AllEvents } from "./AllEvents";
export interface TypedDocumentAndElementEventHandlers<T extends EventTarget>
  extends Pick<AllEvents<T>, "oncopy" | "oncut" | "onpaste"> {}
