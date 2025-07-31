import type { DoFetch } from "../types";
import { doGenericFetch } from "./doGenericFetch";

export const doFetch: DoFetch = async (
  request,
) => {
  const response = await doGenericFetch(request);
  return (await response.json());
};
