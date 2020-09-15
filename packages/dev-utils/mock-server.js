/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

// node 脚本, 部分 eslint 规则不适用

const path = require('path')
const { mock } = require('mockjs')
const { pathToRegexp } = require('path-to-regexp')
const glob = require('glob')
const findUp = require('find-up')
const { throttle } = require('lodash')

const isFunction = (fn) => typeof fn === 'function'

const rootPath = path.dirname(findUp.sync('lerna.json'))
const mockPatterns = path.join(rootPath, './mock/**/*.js')
const MATCH_REGEXP = /^(\w+)\s+(\S+)$/

const IDLE = 30 * 1000

const apis = glob
  .sync(mockPatterns)
  .filter((v) => /\/[^_][^/]+?\.js$/.test(v))
  .map((v) => {
    // 简单进行节流处理, 避免频繁读取新文件, 适当利用缓存
    const perf = throttle(() => {
      delete require.cache[path.resolve(v)]
    }, IDLE)
    return () => {
      perf()
      return require(v)
    }
  })

module.exports = function setupMockServer (app) {
  app.use((req, res, next) => {
    let isMatch
    for (let k = 0; k < apis.length; k += 1) {
      const rule = apis[k]()
      isMatch = Object.entries(rule)
        .some(([ key, value ]) => {
          const [ , method, api ] = key.match(MATCH_REGEXP) || [ null, 'GET', key ]
          if (
            req.method === method.toUpperCase()
            && pathToRegexp(api).test(req.url)
          ) {
            res.json(mock(isFunction(value) ? value(req, res) : value))
            return true
          }
          return false
        })

      if (isMatch) {
        break
      }
    }
    if (!isMatch) {
      next()
    }
  })
}
