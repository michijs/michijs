import type { DOMPort } from "../../ports/dom.port";
import type { StoragePort } from "../../ports/storage.port";
import type { BrowserPort } from "../../ports/browser.port";
import type { EventsPort } from "../../ports/events.port";
import type { StylingPort } from "../../ports/styling.port";

export interface Adapters {
  dom: DOMPort;
  storage: StoragePort;
  browser: BrowserPort;
  events: EventsPort;
  styling: StylingPort;
}

export class DependencyContainer {
  private static instance: DependencyContainer;
  private adapters: Partial<Adapters> = {};

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  register<K extends keyof Adapters>(key: K, adapter: Adapters[K]): void {
    this.adapters[key] = adapter;
  }

  get<K extends keyof Adapters>(key: K): Adapters[K] {
    const adapter = this.adapters[key];
    if (!adapter) {
      throw new Error(`Adapter "${key}" not registered`);
    }
    return adapter as Adapters[K];
  }

  getAll(): Adapters {
    return this.adapters as Adapters;
  }
}

export const container = DependencyContainer.getInstance();
