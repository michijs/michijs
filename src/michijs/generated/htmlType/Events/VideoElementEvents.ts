import type { AllEvents } from "./AllEvents";
export interface VideoElementEvents<T extends EventTarget>
  extends Pick<
    AllEvents<T>,
    "onenterpictureinpicture" | "onleavepictureinpicture"
  > {}
