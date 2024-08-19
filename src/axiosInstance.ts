import Axios from './core/Axios'
import defaultRequestConfig from './defaults'
import { extend } from './helpers/utils'
import mergeConfig from './core/mergeConfig'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // bind `this` to context object
  // because `this.request` was called in Axios class functions
  // call example: instance({ url: '/api/data', method: 'GET' }) or instance('/api/data', { method: 'GET' })
  const instance = Axios.prototype.request.bind(context)
  // instance({ url: '/api/data', method: 'GET' })
  // instance('/api/data', { method: 'GET' })

  // to extend the context's field into instance function object
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaultRequestConfig)

axios.create = function(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaultRequestConfig, config))
}

export default axios
