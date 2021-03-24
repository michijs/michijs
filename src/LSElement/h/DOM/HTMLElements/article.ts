import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export interface article extends Partial<
    GlobalAttributes
    & GetRoles<'application' | 'document' | 'feed' | 'main' | 'none' | 'presentation' | 'region'>
>{}