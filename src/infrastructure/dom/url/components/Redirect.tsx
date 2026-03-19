import { HistoryManager } from "../../routing/entities/HistoryManager";
import { unproxify, wait } from "@shared";
import { GenericElement } from "../../rendering/components/GenericElement";
import type { CallableReactiveOrConst } from "@ports";

export interface RedirectProps {
  /**The target URL or location. */
  to: CallableReactiveOrConst<URL | string | (() => URL | string)>;
}

/**
 * Redirect component for navigating to a different URL or location.
 **/
export const Redirect = ({ to }: RedirectProps) => (
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
