import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";
import { MIMEType } from "../DOMAttributes/types";

export type a = Partial<GlobalAttributes & GetAttributes<'download'
    | 'href'
    | 'hreflang'
    | 'ping'
    | 'rel'
    | 'target'
> & {
    /**
     * Specifies the media type of the linked document:
     */
    type: MIMEType;
} & GetRoles<'button'
    | 'checkbox'
    | 'menuitem'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'option'
    | 'radio'
    | 'switch'
    | 'tab'
    | 'treeitem'
>>