import { deepMerge, isPlainObject } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

const strategies = Object.create(null)

function defaultMergeStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2MergeStrategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strategyKeysFromVal2 = ['url', 'params', 'data']

strategyKeysFromVal2.forEach(key => {
  strategies[key] = fromVal2MergeStrategy
})

const strategyKeysDeepMerge = ['headers']

strategyKeysDeepMerge.forEach(key => {
  strategies[key] = deepMergeStrategy
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // match merge strategy function by request config key
    const strategyFunc = strategies[key] || defaultMergeStrategy
    config[key] = strategyFunc(config1[key], config2![key])
  }

  return config
}
