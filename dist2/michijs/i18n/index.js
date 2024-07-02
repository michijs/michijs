import { ProxiedValue } from "../classes";
import { useObserve } from "../hooks";
import { bindObservable, unproxify } from "../utils";

/**
 * @typedef {import('../types').ObservableOrConst}
 * @typedef {import('../types').ObservableType}
 * @typedef {import('../types').Subscription}
 */

/**

 * @template {string} K

 * @template T

 * @typedef {object} TranslationItem

 * @property {Translation<K, T>} translation

 * @property {ObservableType<Partial<T>>} observable

 */

/**

 * @template {string} K

 * @template T

 * @typedef {{ [key in K]: T | (() => Promise<{ default: T }>) | (() => Promise<T>); }} Translation

 */

/**
 * @template {string} [K = string]
 */
export class I18n extends ProxiedValue {
  /**
   * @private
   */
  translations = new Array();
  /**
   * @private
   */
  get isUsingSystemLanguage() {
    return this.$value === navigator.language;
  }

  /**
   * @param {ObservableOrConst<K | undefined>} [language]
   * @param {Subscription<K | undefined>[]} [initialObservers]
   */
  constructor(language, initialObservers) {
    super(unproxify(language) ?? navigator.language, initialObservers);
    if (language) {
      bindObservable(language, (newValue) => this.setLanguage(newValue));
    }

    window.addEventListener("languagechange", () => {
      if (!this.isUsingSystemLanguage) this.setLanguage(navigator.language);
    });
  }

  get currentLanguage() {
    return this.$value;
  }
  set currentLanguage(newLang) {
    this.setLanguage(newLang);
  }

  /**
   * @template T
   * @param {Translation<K, T>} translation
   */
  createTranslation(translation) {
    const currentTranslationPromise = this.getCurrentTranslation(translation);
    const observable = useObserve({});
    currentTranslationPromise.then((currentTranslation) => {
      observable(currentTranslation);
    });

    const translationItem = {
      translation,
      observable,
    };
    this.translations.push(translationItem);
    return observable;
  }

  /**
   * @private
   * @template T
   * @param {Translation<K, T>} translation
   */
  getCurrentTranslation(translation) {
    return new Promise((resolve) => {
      const translationKeys = Object.keys(translation);
      let key = this.currentLanguage
        ? translationKeys.find((key) => key === this.currentLanguage)
        : undefined;
      if (!key) {
        // It does not have the current language - Fallback to next language in navigator.languages
        key = navigator.languages.find((key) => translationKeys.includes(key));
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
      else resolve(value);
    });
  }

  /**
   * @private
   * @param {K | undefined} newLang
   */
  async setLanguage(newLang) {
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

  useSystemLanguage() {
    this.setLanguage(navigator.language);
  }
}
