import { buildURL } from '../src/helpers/url'

describe('buildURL', () => {
  it('should return the original URL if no params are provided', () => {
    const url = 'https://example.com'
    expect(buildURL(url)).toBe(url)
  })

  it('should append params to the URL if they are provided', () => {
    const url = 'https://example.com'
    const params = { foo: 'bar' }
    debugger
    expect(buildURL(url, params)).toBe('https://example.com?foo=bar')
  })

  it('should handle multiple params', () => {
    const url = 'https://example.com'
    const params = { foo: 'bar', baz: 'qux' }
    expect(buildURL(url, params)).toBe('https://example.com?foo=bar&baz=qux')
  })

  it('should handle array params', () => {
    const url = 'https://example.com'
    const params = { foo: ['bar', 'baz'] }
    expect(buildURL(url, params)).toBe('https://example.com?foo[]=bar&foo[]=baz')
  })

  it('should handle object params', () => {
    const url = 'https://example.com'
    const params = { foo: { bar: 'baz' } }
    expect(buildURL(url, params)).toBe('https://example.com?foo=%7B%22bar%22:%22baz%22%7D')
  })

  it('should handle date params', () => {
    const url = 'https://example.com'
    const params = { foo: new Date('2022-01-01T00:00:00.000Z') }
    expect(buildURL(url, params)).toBe('https://example.com?foo=2022-01-01T00:00:00.000Z')
  })

  it('should handle null and undefined params', () => {
    const url = 'https://example.com'
    const params = { foo: null, bar: undefined }
    expect(buildURL(url, params)).toBe(url)
  })

  it('should handle existing query string', () => {
    const url = 'https://example.com?foo=bar'
    const params = { baz: 'qux' }
    expect(buildURL(url, params)).toBe('https://example.com?foo=bar&baz=qux')
  })

  it('should handle existing hash', () => {
    const url = 'https://example.com#foo'
    const params = { bar: 'baz' }
    expect(buildURL(url, params)).toBe('https://example.com?bar=baz')
  })
})
