import { Method } from '../types'
import { deepMerge, isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizeHeaderName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizeHeaderName && name.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      headers[normalizeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseResponseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    parsed[key] = val?.trim()
  })

  return parsed
}

/**
 * headers: {
 *  common: {
 *    Accept: 'application/json, text/plain'
 *  },
 *  post: {
 *    'Content-Type': 'application/x-www-form-urlencoded'
 *  }
 * }
 * make headers above to be headers below
 * headers: {
 *  Accept: 'application/json, text/plain',
 *  'Content-Type': 'application/x-www-form-urlencoded'
 * }
 * @param headers
 * @param method
 * @returns
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
