import { ObserveProps } from "../observe";
import { ProxiedValue } from "./ProxiedValue";

export const observeValue = <T extends object>(props: ObserveProps<T>) => {
  return new ProxiedValue(props.item)
};
