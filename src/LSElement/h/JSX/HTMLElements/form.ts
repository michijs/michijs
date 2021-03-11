import { GetAttributes, GetRoles } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type form = Partial<GlobalAttributes& GetAttributes<'accept-charset'
| 'autocomplete'
| 'name'
| 'rel'
| 'action'
| 'enctype'
| 'method'
| 'novalidate'
| 'target'
> & GetRoles<'search' | 'none' | 'presentation'>>