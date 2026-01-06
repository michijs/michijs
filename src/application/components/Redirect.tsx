import { HistoryManager } from "../../domain/routing/HistoryManager/index";
import type { FC, ObservableOrConst } from "../../shared/types/types";
import { unproxify } from "../../shared/utils/unproxify";
import { wait } from "../../shared/utils/wait";
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
      HistoryManager.push(
        typeof toValue === "function"
          ? (toValue as () => string | URL)()
          : toValue,
      );
    }}
  />
);
