declare global {
  interface Window {
    msCrypto?: Crypto;

    URLPattern?: {
      new(
        url: Partial<URL> & { baseURL?: string },
      ): {
        test(url: string): boolean;
      };
    };
  }
}
