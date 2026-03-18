import type { DoFetch } from "../../../michijs/types";
import { doGenericFetch } from "../../../michijs/utils/doGenericFetch";

export const doFetch: DoFetch = async (request) => {
  const response = await doGenericFetch(request);
  return await response.json();
};
