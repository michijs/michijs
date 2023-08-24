import type { TypedEvent } from "@michijs/htmltype";
import { createCustomElement, h, I18n } from "../../src";
import en from "./i18nTests/en.json";

const supportedLanguages = [
  { key: "en", label: "English" },
  { key: "es", label: "Español" },
];

const translator = new I18n<"es" | "en">(localStorage.getItem("lang"));

const t = await translator.createTranslation({
  es: () => import("./i18nTests/es.json"),
  en,
});

translator.subscribe(() => {
  if (translator.currentLanguage)
    localStorage.setItem("lang", translator.currentLanguage);
});

const I18nTests = createCustomElement("i18n-tests", {
  methods: {
    onChangeLanguage(ev: TypedEvent<HTMLSelectElement>) {
      if (ev.target)
        translator.currentLanguage = ev.target.value as "es" | "en";
    },
  },
  render() {
    return (
      <>
        <span>{t.language}</span>
        {/* <List
          as="select"
          onchange={this.onChangeLanguage}
          data={supportedLanguages}
          renderItem={({ key, label }) => (
            <option
              key={key}
              selected={key === translator.currentLanguage}
              value={key}
            >
              {label}
            </option>
          )}
        /> */}
        <span>{t.dogBit}</span>
      </>
    );
  },
});

export default I18nTests