import { HistoryManager } from "../classes";
import { FC, ObservableProps } from "../types";
import { unproxify, wait } from "../utils";
import { GenericElement } from "./GenericElement";

export interface RedirectProps {
  /**The target URL or location. */
  to: ObservableProps<URL | string | (() => URL | string)>;
}

/**
 * Redirect component for navigating to a different URL or location.
 **/
export const Redirect: FC<RedirectProps> = ({ to }) => (
  <GenericElement
    onconnected={async () => {
      const toValue = unproxify(to);
      await wait(0);
      HistoryManager.push(typeof toValue === "function" ? toValue() : toValue);
    }}
  />
);
