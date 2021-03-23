import { GetRoles } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type section = Partial<
    GlobalAttributes
    & GetRoles<
        'alert'
        | 'alertdialog'
        | 'application'
        | 'banner'
        | 'complementary'
        | 'contentinfo'
        | 'dialog'
        | 'document'
        | 'feed'
        | 'log'
        | 'main'
        | 'marquee'
        | 'navigation'
        | 'none'
        | 'note'
        | 'presentation'
        | 'search'
        | 'status'
        | 'tabpanel'>
>