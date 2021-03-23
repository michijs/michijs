import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetAttributes, GetType } from "../DOMAttributes/Utils";

export type source = Partial<
    GlobalAttributes
    & GetAttributes<'media' | 'sizes' | 'src' | 'srcset'>
    & GetType<'Source'>
>