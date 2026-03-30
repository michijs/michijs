import type { CallableReactiveOrConst, CallableProxiedValuePort } from "@ports";

export interface UseStringTemplatePort {
  (
    templateStringsArray: TemplateStringsArray,
    ...props: CallableReactiveOrConst<string | number | undefined>[]
  ): CallableProxiedValuePort<string>;
}
