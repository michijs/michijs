import type { CallableReactiveOrConst, ReactiveValuePort } from "#ports";

export interface UseStringTemplatePort {
  (
    templateStringsArray: TemplateStringsArray,
    ...props: CallableReactiveOrConst<string | number | undefined>[]
  ): ReactiveValuePort<string>;
}
