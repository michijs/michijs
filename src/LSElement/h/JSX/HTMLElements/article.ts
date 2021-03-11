import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";
import { GetRoles } from "../DOMAttributes/Utils";

export type article = Partial<GlobalAttributes & GetRoles<'application' | 'document' | 'feed' | 'main' | 'none' | 'presentation' | 'region'>>