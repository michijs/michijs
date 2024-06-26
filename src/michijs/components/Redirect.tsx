import { HistoryManager } from "../classes";
import { createFunctionalComponent } from "../customElements";
import type { CreateFunctionalComponent } from "../types";
import { unproxify, wait } from "../utils";
import { GenericElement } from "./GenericElement";

export interface RedirectProps {
  /**The target URL or location. */
  to: URL | string | (() => URL | string);
}

/**
 * Redirect component for navigating to a different URL or location.
 **/
export const Redirect: CreateFunctionalComponent<RedirectProps> =
  createFunctionalComponent<RedirectProps>(({ to }) => (
    <GenericElement
      onelementconnected={async () => {
        const toValue = unproxify(to);
        await wait(0);
        HistoryManager.push(
          typeof toValue === "function" ? toValue() : toValue,
        );
      }}
    />
  ));
