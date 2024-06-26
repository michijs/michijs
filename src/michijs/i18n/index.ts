import { ProxiedValue } from "../classes";
import { useObserve } from "../hooks";
import type { ObservableOrConst, ObservableType, Subscription } from "../types";
import { bindObservable, unproxify } from "../utils";

export type Translation<K extends string, T> = {
  [key in K]: T | (() => Promise<{ default: T }>) | (() => Promise<T>);
};
export interface TranslationItem<K extends string, T> {
  translation: Translation<K, T>;
  observable: ObservableType<Partial<T>>;
}

export class I18n<K extends string = string> extends ProxiedValue<K | undefined> {
  private translations = new Array<TranslationItem<K, any>>();
  private get isUsingSystemLanguage() {
    return this.$value === navigator.language
  };

  constructor(
    language?: ObservableOrConst<K | undefined>,
    initialObservers?: Subscription<K | undefined>[],
  ) {
    super((unproxify(language) ?? navigator.language) as K | undefined, initialObservers);
    if (language) {
      bindObservable(language, (newValue) => this.setLanguage(newValue as K));
    }

    window.addEventListener("languagechange", () => {
      if (!this.isUsingSystemLanguage)
        this.setLanguage(navigator.language as K);
    });
  }

  get currentLanguage(): K | undefined {
    return this.$value;
  }
  set currentLanguage(newLang: K | undefined) {
    this.setLanguage(newLang);
  }

  createTranslation<T>(
    translation: Translation<K, T>,
  ): ObservableType<Partial<T>> {
    const currentTranslationPromise = this.getCurrentTranslation(translation);
    const observable = useObserve<Partial<T>>({});
    currentTranslationPromise.then((currentTranslation) => {
      (observable as ObservableType<object>)(currentTranslation as object);
    });

    const translationItem: TranslationItem<K, T> = {
      translation,
      observable,
    };
    this.translations.push(translationItem as TranslationItem<K, any>);
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
      this.$value = key;

      if (typeof value === "function")
        value().then((res) => {
          resolve(res.default ?? res);
        });
      else resolve(value as T);
    });
  }

  private async setLanguage(newLang: K | undefined) {
    if (this.$value !== newLang) {
      this.$value = newLang;
      //Update every translation
      await Promise.all(
        this.translations.map(async (x) => {
          const currentTranslation = await this.getCurrentTranslation(
            x.translation,
          );
          x.observable(currentTranslation);
        }),
      );
    }
  }

  useSystemLanguage(): void {
    this.setLanguage(navigator.language as K);
  }
}
