import type { TypedEvent } from "@michijs/htmltype";
import { createCustomElement, h, I18n, Title, useStorage } from "../../src";
import en from "./i18nTests/en.json";

type SupportedLanguages = "es" | "en";

const supportedLanguages: [{ key: SupportedLanguages, label: string }] = [
  { key: "en", label: "English" },
  { key: "es", label: "Español" },
];

const languageStorage = useStorage({
  lang: 'en' as SupportedLanguages
})

const translator = new I18n<SupportedLanguages>(languageStorage.lang);

const t = await translator.createTranslation({
  es: () => import("./i18nTests/es.json"),
  en,
});

const I18nTests = createCustomElement("i18n-tests", {
  methods: {
    onChangeLanguage(ev: TypedEvent<HTMLSelectElement>) {
      if (ev.target)
        languageStorage.lang = ev.target.value as SupportedLanguages
    },
  },
  render() {
    return (
      <>
        <Title>I18n tests Page</Title>
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