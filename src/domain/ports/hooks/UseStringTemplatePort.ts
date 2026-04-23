import type { CallableReactiveOrConst, ObservableProxyPort } from "@ports";

export interface UseStringTemplatePort {
  (
    templateStringsArray: TemplateStringsArray,
    ...props: CallableReactiveOrConst<string | number | undefined>[]
  ): ObservableProxyPort<string>;
}
