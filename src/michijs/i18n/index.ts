import { observable, store } from "../hooks";
import { ObservableLike, ObserverCallback, Store } from "../types";

type StringObject =
  | {
      [key: string]: string | StringObject | undefined | null | number;
    }
  | (string | StringObject | undefined | null | number)[];

export type Translation<T extends StringObject, K extends string> = {
  [key in K]: T | (() => Promise<{ default: T }>);
};
export interface TranslationItem<T extends StringObject, K extends string> {
  translation: Translation<T, K>;
  store: CreateTranslationResultStore<T>;
}
export type CreateTranslationResultStore<T extends StringObject> = Store<
  {
    t: T;
  },
  {
    updateTranslation(newTranslation: T);
  }
>;

export class I18n<K extends string> implements ObservableLike {
  private translations = new Array<TranslationItem<StringObject, string>>();
  private observer = observable();
  private _currentLanguage: K | undefined;
  private isUsingSystemLanguage = true;

  constructor(initialLanguage?: string | null) {
    if (initialLanguage) {
      this._currentLanguage = initialLanguage as K;
      this.isUsingSystemLanguage = false;
    }

    window.addEventListener("languagechange", () => {
      if (!this.isUsingSystemLanguage) {
        this.setLanguage(navigator.language as K);
      }
    });
  }
  subscribe(observer: ObserverCallback<any>): void {
    return this.observer.subscribe(observer);
  }
  unsubscribe?(observer: ObserverCallback<any>): void {
    return this.observer.unsubscribe(observer);
  }

  get currentLanguage(): K | undefined {
    return this._currentLanguage;
  }
  set currentLanguage(newLang: K | undefined) {
    this.setLanguage(newLang);
    this.isUsingSystemLanguage = false;
  }

  createTranslation<T extends StringObject>(translation: Translation<T, K>) {
    const translationResult = store({
      state: {
        t: {} as T,
      },
      transactions: {
        updateTranslation(newTranslation: T) {
          Object.entries(newTranslation).forEach(([key, value]) => {
            translationResult.state.t[key] = value;
          });
        },
      },
    });
    const translationItem = {
      translation,
      store: translationResult,
    };
    this.translations.push(translationItem);
    this.updateTranslation<T>(translationItem);
    return { ...translationResult, t: translationResult.state.t };
  }

  private updateTranslation<T extends StringObject>({
    translation,
    store,
  }: TranslationItem<T, K>) {
    const translationKeys = Object.keys(translation) as K[];
    let key: K | undefined = this.currentLanguage
      ? translationKeys.find((key) => key === this.currentLanguage)
      : undefined;
    if (!key) {
      // It does not have the current language - Fallback to next language in navigator.languages
      key = navigator.languages.find((key) =>
        translationKeys.includes(key as K),
      ) as K;
      if (!key) {
        // Does not include any browser language - I use the latest language of the object
        key = translationKeys[translationKeys.length - 1];
      }
    }
    const value = translation[key];
    this._currentLanguage = key;

    if (typeof value === "function")
      value().then((res) => {
        store.transactions.updateTranslation(res.default);
      });
    else store.transactions.updateTranslation(value as T);
  }

  private setLanguage(newLang: K | undefined) {
    if (this._currentLanguage !== newLang) {
      this._currentLanguage = newLang;
      //Update every translation
      this.translations.forEach((x) => this.updateTranslation(x));
      // Then notify
      this.observer.notify(newLang);
    }
  }

  useSystemLanguage() {
    this.setLanguage(navigator.language as K);
    this.isUsingSystemLanguage = true;
  }
}
