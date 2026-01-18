import defer * as GarbageCollectedEventModule from "./GarbageCollectedEvent";

export class GarbageCollectableObject<T extends object> {
  declare ref: T;
  constructor(obj: T) {
    removeObservablesGarbageCollection: {
      const ref = new WeakRef(obj);
      Object.defineProperty(this, "ref", {
        get() {
          const deref = ref.deref();
          if (!deref) throw new GarbageCollectedEventModule.GarbageCollectedEvent();
          return deref;
        },
      });
    }
    if (!this.ref) this.ref = obj;
  }
}
