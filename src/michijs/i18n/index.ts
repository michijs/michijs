import { ProxiedValue } from "../classes/ProxiedValue";
import type { ObservableOrConst, ObservableType, ParentSubscription, Subscription } from "../types";
import { unproxify } from "../utils/unproxify";
import { bindObservable } from "../utils/bindObservable";
import { useAsyncComputedObserve } from "../hooks";

export type Translation<K extends string, T> = {
  [key in K]: T | (() => Promise<{ default: T }>) | (() => Promise<T>);
};

export class I18n<K extends string = string> extends ProxiedValue<K> {
  private isUsingSystemLanguage = true;
  public supportedLanguages: K[];

  /**
   * It is supported using observables. By default, the desired languages are taken from the browser. If your code supports an exact match (e.g., "en-UK") or a general match (e.g., "en"), that language will be selected. Otherwise, it falls back to the default language (the first one in the list). The default language cannot be obtained asynchronously.
   * @param supportedLanguages A list of supported languages - BCP 47
   * @param language The selected language - can be an observable
   */
  constructor(
    supportedLanguages: K[],
    language?: ObservableOrConst<string | undefined>
  ) {
    super((unproxify(language) ?? navigator.language) as K);
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
