import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface aside extends Partial<
    GlobalAttributes
    & GetRoles<'feed' | 'none' | 'note' | 'presentation' | 'region' | 'search'>
>{}