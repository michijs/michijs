import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type optgroup = Partial<GlobalAttributes & GetAttributes<'disabled' | 'label'>>