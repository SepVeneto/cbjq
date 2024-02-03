import debug from 'debug'

export function createDebug(namespace: string) {
  const _debug = debug(namespace)
  return (...args: any[]) => _debug('%o', ...args)
}
