import { GetAttributes, GetType } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type link = Partial<
    GlobalAttributes
    & GetAttributes<'as'
        | 'crossorigin'
        | 'disabled'
        | 'href'
        | 'hreflang'
        | 'imagesizes'
        | 'imagesrcset'
        | 'media'
        | 'referrerpolicy'
        | 'rel'
        | 'sizes'
        | 'title'
    >
    & GetType<'Link'>
>