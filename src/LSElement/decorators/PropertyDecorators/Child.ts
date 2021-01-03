import { getRootNode } from '../../render/getRootNode';

export function Child(id: string): PropertyDecorator {
  return function () {
    return {
      get() {
        return getRootNode(this).getElementById(id);
      },
    };
  };
}
