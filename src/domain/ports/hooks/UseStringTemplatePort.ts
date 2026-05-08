import type {
  CallableReactiveOrConst,
  CallableReactiveValuePort,
} from "#ports";

export interface UseStringTemplatePort {
  (
    templateStringsArray: TemplateStringsArray,
    ...props: CallableReactiveOrConst<string | number | undefined>[]
  ): CallableReactiveValuePort<string>;
}
