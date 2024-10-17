import {
  createCustomElement,
  I18n,
  Title,
  useStorage,
  type TypedEvent,
} from "@michijs/michijs";
import en from "./i18nTests/en";

const { lang } = useStorage({
  lang: navigator.language,
});

const translator = new I18n(['en-uk', 'es'], lang);

const t = translator.createTranslation({
  es: () => import("./i18nTests/es"),
  'en-uk': en
});

const I18nTests = createCustomElement("i18n-tests", {
  methods: {
    onChangeLanguage(ev: TypedEvent<HTMLSelectElement>) {
      if (ev.target) {
        lang(ev.target.value);
      }
    },
  },
  render() {
    return (
      <>
        <Title>I18n tests Page</Title>
        <span>{t.language}</span>
        <select onchange={this.onChangeLanguage}>
          {translator.supportedLanguages.map((key) => (
            <option selected={translator.currentLanguage === key} value={key}>
              {t[key]}
            </option>
          ))}
        </select>
        <p>{t.dogBit}</p>
        <p>{t.birthDay} {translator.computedTranslation(lang => new Date().toLocaleDateString(lang))}</p>
        {t.listTest}
      </>
    );
  },
});

export default I18nTests;
