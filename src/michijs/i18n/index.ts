import { Observable } from "../classes";
import { useObserve } from "../hooks";
import { ObservableOrConst, ObservableType, Subscription } from "../types";
import { bindObservable } from "../utils";
import { setObservableValue } from "../utils/setObservableValue";

export type Translation<K extends string, T> = {
  [key in K]: T | (() => Promise<{ default: T }>) | (() => Promise<T>);
};
export interface TranslationItem<K extends string, T> {
  translation: Translation<K, T>;
  observable: ObservableType<Partial<T>>;
}

export class I18n<K extends string = string> extends Observable<K> {
  private translations = new Array<TranslationItem<K, any>>();
  private _currentLanguage: K | undefined;
  private isUsingSystemLanguage = true;

  constructor(
    language?: ObservableOrConst<string | null>,
    initialObservers?: Subscription<string>[],
  ) {
    super(initialObservers);
    if (language) {
      bindObservable(language, (newValue) => this.setLanguage(newValue as K));
      this.isUsingSystemLanguage = false;
    }

    window.addEventListener("languagechange", () => {
      if (!this.isUsingSystemLanguage)
        this.setLanguage(navigator.language as K);
    });
  }

  get currentLanguage(): K | undefined {
    return this._currentLanguage;
  }
  set currentLanguage(newLang: K | undefined) {
    this.setLanguage(newLang);
    this.isUsingSystemLanguage = false;
  }

  createTranslation<T>(
    translation: Translation<K, T>,
  ): ObservableType<Partial<T>> {
    const currentTranslationPromise = this.getCurrentTranslation(translation);
    const observable = useObserve<Partial<T>>({});
    currentTranslationPromise.then((currentTranslation) => {
      setObservableValue(observable, currentTranslation);
    });

    const translationItem: TranslationItem<K, T> = {
      translation,
      observable,
    };
    this.translations.push(translationItem);
    return observable;
  }

  private getCurrentTranslation<T>(translation: Translation<K, T>): Promise<T> {
    return new Promise<T>((resolve) => {
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
          resolve(res.default ?? res);
        });
      else resolve(value as T);
    });
  }

  private async setLanguage(newLang: K | undefined) {
    if (this._currentLanguage !== newLang) {
      this._currentLanguage = newLang;
      //Update every translation
      await Promise.all(
        this.translations.map(async (x) => {
          const currentTranslation = await this.getCurrentTranslation(
            x.translation,
          );
          setObservableValue(x.observable, currentTranslation);
        }),
      );
      // Then notify
      this.notify(newLang);
    }
  }

  useSystemLanguage() {
    this.setLanguage(navigator.language as K);
    this.isUsingSystemLanguage = true;
  }
}
