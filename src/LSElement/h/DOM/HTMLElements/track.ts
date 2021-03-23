import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type track = Partial<
    GlobalAttributes
    & GetAttributes<'default'
        | 'kind'
        | 'label'
        | 'src'
        | 'srclang'
    >
>