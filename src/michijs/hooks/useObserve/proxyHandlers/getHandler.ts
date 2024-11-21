import { PrimitiveProxyHandler } from "./PrimitiveProxyHandler";

export const getHandler = (value: unknown): ProxyHandler<any> => {
  const typeOfValue = typeof value;

  switch(typeOfValue){
    default:
      // TODO: add props
      return new PrimitiveProxyHandler()
  }
}