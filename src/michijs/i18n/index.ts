import { ProxiedValue } from "../classes/ProxiedValue";
import type { ObservableOrConst, ObservableType, Subscription } from "../types";
import { unproxify } from "../utils/unproxify";
import { bindObservable } from "../utils/bindObservable";
import { useAsyncComputedObserve } from "../hooks";

export type Translation<K extends string, T> = {
  [key in K]: T | (() => Promise<{ default: T }>) | (() => Promise<T>);
};

export class I18n<K extends string = string> extends ProxiedValue<K> {
  private isUsingSystemLanguage = true;
  public supportedLanguages: K[];

  constructor(
    supportedLanguages: K[],
    language?: ObservableOrConst<string | undefined>,
    initialObservers?: Subscription<K | undefined>[],
  ) {
    super((unproxify(language) ?? navigator.language) as K, initialObservers);
    this.supportedLanguages = supportedLanguages;
    bindObservable(language, (newValue) => (this.currentLanguage = newValue));

    window.addEventListener("languagechange", () => {
      if (this.isUsingSystemLanguage) this.currentLanguage = undefined;
    });
  }

  get currentLanguage(): K {
    return this.$value;
  }
  set currentLanguage(newDesiredLanguage: string | undefined) {
    const desiredLanguages = [...navigator.languages];
    let foundMatch = false;
    if (newDesiredLanguage) {
      this.isUsingSystemLanguage = false;
      desiredLanguages.unshift(newDesiredLanguage);
    } else this.isUsingSystemLanguage = true;

    for (const desiredLang of desiredLanguages) {
      // First, check for an exact match
      if (this.supportedLanguages.includes(desiredLang as K)) {
        this.$value = desiredLang as K;
        foundMatch = true;
        break;
      }

      // Then, check for a general match (e.g., "en" instead of "en-EN")
      const generalLang = desiredLang.split("-")[0] as K;
      if (this.supportedLanguages.includes(generalLang)) {
        this.$value = generalLang as K;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) this.$value = this.defaultLanguage;
  }

  get defaultLanguage() {
    return this.supportedLanguages[0];
  }

  createTranslation<T>(
    translation: Translation<K, T>,
  ): ObservableType<Partial<T>> {
    return useAsyncComputedObserve<Partial<T>>(
      async () => await this.getCurrentTranslation(translation),
      translation[this.defaultLanguage] as Partial<T>,
      [this],
    );
  }

  private getCurrentTranslation<T>(translation: Translation<K, T>): Promise<T> {
    return new Promise<T>((resolve) => {
      const value = translation[this.currentLanguage];

      if (typeof value === "function")
        value().then((res) => {
          resolve(res.default ?? res);
        });
      else resolve(value as T);
    });
  }
}
