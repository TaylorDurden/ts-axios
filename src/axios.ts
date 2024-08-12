import Axios from './core/axios'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // bind `this` to context object
  // because `this.request` was called in Axios class functions
  // call example: instance({ url: '/api/data', method: 'GET' }) or instance('/api/data', { method: 'GET' })
  const instance = Axios.prototype.request.bind(context)
  // instance({ url: '/api/data', method: 'GET' })
  // instance('/api/data', { method: 'GET' })

  // to extend the context's field into instance function object
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
