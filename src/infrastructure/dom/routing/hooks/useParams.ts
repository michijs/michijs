import { useComputedObserve } from "#domain";
import { HistoryManager } from "../entities/HistoryManager";
import type { UseParams } from "../types";
import type { UrlFunction } from "../../../platform";

export function extractParams(
  pattern: string,
  parentRoute?: UrlFunction,
): Record<string, string> {
  const parentPathname = parentRoute
    ? new URL(parentRoute()).pathname
    : undefined;
  const fullPattern = `${parentPathname ?? ""}${pattern.startsWith("/") ? pattern : `/${pattern}`}`;

  const patternParts = fullPattern.split("/").filter((x) => x !== "");
  const locationParts = location.pathname.split("/").filter((x) => x !== "");
  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    if (part?.startsWith(":") && locationParts[i] !== undefined) {
      params[part.slice(1)] = locationParts[i]!;
    }
  }

  return params;
}

/**
 * Reactively extracts dynamic route parameters from the current URL based on a route pattern.
 * Re-computes whenever the URL changes via HistoryManager.
 * @param pattern - The route pattern containing `:param` segments (e.g. "/users/:id/profile")
 * @param parentRoute - Optional parent route UrlFunction for nested routers
 * @returns A reactive observable proxy with the extracted params
 */
export const useParams: UseParams = (pattern, parentRoute?) =>
  useComputedObserve(
    () => extractParams(pattern, parentRoute),
    [HistoryManager],
    { useProxied: true },
  ) as any;
