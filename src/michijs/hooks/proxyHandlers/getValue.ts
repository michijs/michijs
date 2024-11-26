import { ProxiedValue } from '../../classes/ProxiedValue'

export const getValue = <T>(value: T | ProxiedValue<T>): T => {
  // @ts-ignore
  return value?.$value ?? value
}