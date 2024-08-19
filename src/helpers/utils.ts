// cache the method
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * Extends the `to` object with the properties of the `from` object.
 *
 * @param to The object to extend.
 * @param from The object to extend from.
 * @returns The extended object.
 */
export function extend<T, U>(to: T, from: U): T & U {
  // Iterate over the properties of the `from` object
  for (const key in from) {
    // Add the property to the `to` object, casting the value to `any` to avoid type errors
    ;(to as T & U)[key] = from[key] as any
  }
  // Return the extended object, casting it to the intersection type `T & U`
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
