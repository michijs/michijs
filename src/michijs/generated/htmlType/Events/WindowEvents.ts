import type { AllEvents } from "./AllEvents";
export interface WindowEvents<T extends EventTarget>
  extends Pick<
    AllEvents<T>,
    | "onundo"
    | "onredo"
    | "onafterprint"
    | "onbeforeprint"
    | "onbeforeunload"
    | "ongamepadconnected"
    | "ongamepaddisconnected"
    | "onhashchange"
    | "onlanguagechange"
    | "onmessage"
    | "onmessageerror"
    | "onoffline"
    | "ononline"
    | "onpagehide"
    | "onpageshow"
    | "onpopstate"
    | "onrejectionhandled"
    | "onstorage"
    | "onunhandledrejection"
    | "onunload"
  > {}
