import { Events } from '@lsegurado/htmltype';
import { createCustomElement, h, I18n } from '../../src';
import en from './i18nTests/en.json';

const supportedLanguages = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' }
];

const { t, i18nObservable, lang } = I18n.createTranslation({
  es: () => import('./i18nTests/es.json'),
  en
});

export const I18nTests = createCustomElement('ls-i18n-tests', {
  subscribeTo: {
    i18nObservable
  },
  methods: {
    onChangeLanguage(ev: Events.TypedEvent<HTMLSelectElement>) {
      I18n.setLanguage(ev.target.value);
    }
  },
  render() {
    return (
      <>
        <span>{t.language}</span>
        <select onchange={this.onChangeLanguage}>
          {supportedLanguages.map(({ key, label }) => <option key={key} selected={key === lang.value} value={key}>{label}</option>)}
        </select>
        <span>{t.dogBit}</span>
      </>
    );
  }
});