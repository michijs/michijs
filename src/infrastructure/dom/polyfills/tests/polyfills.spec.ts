import { describe, expect, it } from "bun:test";
import { build } from "esbuild";
import { join } from "node:path";

const root = join(import.meta.dir, "../../../../..");

/** Bundles a snippet that imports michijs (as an app would), in one file. */
const bundle = async (contents: string, conditions: string[] = []) => {
  const result = await build({
    stdin: { contents, resolveDir: root, loader: "tsx" },
    bundle: true,
    write: false,
    format: "esm",
    platform: "browser",
    conditions,
    tsconfig: join(root, "tsconfig.json"),
    // Fails the build if anything uses top-level await.
    supported:
      conditions.includes("michijs-no-polyfills") &&
      conditions.includes("michijs-no-preloaded-with-cookie-storage")
        ? { "top-level-await": false }
        : {},
    logLevel: "silent",
  });
  return result.outputFiles[0]!.text;
};

const app = `
  import { CookieStorage, createCustomElement, useHash, useStorage } from "@michijs/michijs";
  createCustomElement("x-app", { render: () => String(useHash()) });
  createCustomElement("x-button", { extends: { tag: "button", class: HTMLButtonElement } });
  useStorage({ a: 1 }, new CookieStorage());
`;

describe("Polyfills", () => {
  it("by default: History API fallback, Safari built-in elements and cookies read before starting (top-level await)", async () => {
    const code = await bundle(app);
    expect(code).toContain("LegacyHistoryManager");
    expect(code).toContain("safariBuiltInElements");
    expect(code).toContain("await cookieStore.getAll()");
  });

  it("with michijs-no-polyfills: neither of them (CookieStorage still preloads)", async () => {
    const code = await bundle(app, ["michijs-no-polyfills"]);
    expect(code).toContain("ModernHistoryManager");
    expect(code).not.toContain("LegacyHistoryManager");
    expect(code).not.toContain("safariDefine");
    expect(code).toContain("await cookieStore.getAll()");
  });

  it("with both conditions: no top-level await at all; CookieStorage reads document.cookie", async () => {
    const code = await bundle(app, [
      "michijs-no-polyfills",
      "michijs-no-preloaded-with-cookie-storage",
    ]);
    expect(code).not.toContain("cookieStore.getAll");
    expect(code).toContain("document.cookie");
    expect(code).toContain("CookieStorage = class");
  });
});
