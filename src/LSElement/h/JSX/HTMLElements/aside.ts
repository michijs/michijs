import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type aside = Partial<GlobalAttributes & GetRoles<'feed' | 'none' | 'note' | 'presentation' | 'region' | 'search'>>