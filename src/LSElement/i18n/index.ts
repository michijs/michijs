import { observable } from '../hooks';

type StringObject = {
  [key: string]: string | StringObject
} | string[] | StringObject[]

export type Translation<T extends StringObject> = {
  [key: string]: T | (() => Promise<{ default: T }>)
}
type TransactionItem = { translation: Translation<StringObject>, selectedTranslation: StringObject, i18nObservable: ReturnType<typeof observable>, lang: { value: string } }

export class I18n {
  private static translations = new Array<TransactionItem>()
  static observer = observable();
  static currentLanguage = navigator.language;

  static createTranslation<T extends StringObject>(translation: Translation<T>): { t: T, i18nObservable: ReturnType<typeof observable>, lang: { value: keyof Translation<T> } } {
    const selectedTranslation = {} as T;
    const lang = { value: undefined };
    const i18nObservable = observable();
    this.translations.push(this.updateTranslation({ translation, selectedTranslation, i18nObservable, lang }));
    return { t: selectedTranslation, i18nObservable, lang };
  }

  private static updateTranslation({ translation, selectedTranslation, i18nObservable, lang }: TransactionItem) {
    const translationKeys = Object.keys(translation);
    let key = translationKeys.find((key) => key === this.currentLanguage);
    if (!key) { // It does not have the current language - Fallback to next language in navigator.languages
      key = navigator.languages.find((key) => translationKeys.includes(key));
      if (!key) { // Does not include any browser language - I use the latest language of the object
        key = translationKeys[translationKeys.length - 1];
      }
    }
    lang.value = key;
    const value = translation[key];

    if (typeof value === 'function') {
      value().then(res => {
        Object.assign(selectedTranslation, res.default);
        i18nObservable.notify(this.currentLanguage);
      });
    } else {
      Object.assign(selectedTranslation, value);
      i18nObservable.notify(this.currentLanguage);
    }
    return { translation, selectedTranslation, i18nObservable, lang };
  }

  static setLanguage(newLang: string) {
    this.currentLanguage = newLang;
    //Update every translation
    this.translations.forEach((x) => this.updateTranslation(x));
    // Then notify
    this.observer.notify(newLang);
  }
}
