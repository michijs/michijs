import { GetAttributes } from "../DOMAttributes/Utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type html = Partial<GlobalAttributes& GetAttributes<'xmlns'>>