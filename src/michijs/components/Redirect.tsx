import { HistoryManager } from "../classes/HistoryManager";
import type { FC, ObservableOrConst } from "../types";
import { unproxify } from "../utils/unproxify";
import { wait } from "../utils/wait";
import { GenericElement } from "./GenericElement";

export interface RedirectProps {
  /**The target URL or location. */
  to: ObservableOrConst<URL | string | (() => URL | string)>;
}

/**
 * Redirect component for navigating to a different URL or location.
 **/
export const Redirect: FC<RedirectProps> = ({ to }) => (
  <GenericElement
    onelementconnected={async () => {
      const toValue = unproxify(to);
      await wait(0);
      (await HistoryManager).push(
        typeof toValue === "function"
          ? (toValue as () => string | URL)()
          : toValue,
      );
    }}
  />
);
