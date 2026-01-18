
// Bypass Content-Security-Policy by creating a "Callable" object instead of using function
export class Callable implements Function {
  constructor(setterAndGetterFunction: Function = () => {}) {
    const result = Object.setPrototypeOf(
      setterAndGetterFunction,
      new.target.prototype,
    );
    // Intentional it should not disturb arrays or strings
    delete result.length;
    delete result.name;
    return result;
  }
  declare apply: (this: Function, thisArg: any, argArray?: any) => void;
  declare call: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare bind: (this: Function, thisArg: any, ...argArray: any[]) => void;
  declare prototype: any;
  declare length: number;
  declare arguments: any;
  declare caller: Function;
  declare name: string;
  declare [Symbol.hasInstance]: (value: any) => boolean;
  declare [Symbol.metadata]: DecoratorMetadataObject | null;
}
