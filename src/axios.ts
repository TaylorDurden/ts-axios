import Axios from './core/axios'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // bind `this` to context object
  // because `this.request` was called in Axios class functions
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
