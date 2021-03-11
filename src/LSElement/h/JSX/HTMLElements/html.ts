import { GetAttributes } from "../DOMAttributes/utils";
import { GlobalAttributes } from "../DOMAttributes/GlobalAttributes";

export type html = Partial<GlobalAttributes& GetAttributes<'xmlns'>>