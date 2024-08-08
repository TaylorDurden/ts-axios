import { transformRequest, transformResponseData } from './helpers/data.ts'
import { processHeaders } from './helpers/headers.ts'
import { buildURL } from './helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import xhr from './xhr.ts'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    res.data = transformResponseData(res.data)
    return res
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
