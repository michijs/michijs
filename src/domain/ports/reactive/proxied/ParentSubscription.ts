import type { Subscription } from "@ports";

export interface ParentSubscription<T> extends Subscription<T> {
  shouldNotify(): any;
}
