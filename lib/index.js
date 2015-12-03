/**
 * Modules
 */

var isGeneratorObject = require('@micro-js/is-generator-object')
var slice = require('@micro-js/slice')

/**
 * Expose mapGen
 */

module.exports = map['default'] = map

/**
 * Map over generator
 * @param  {Function} fn
 * @param  {Generator} gen
 * @return {Generator}
 */

function map(fn, gen) {
  return function * () {
    var it = isGeneratorObject(gen) ? gen : gen.apply(null, slice(arguments))
    var next = it.next()

    while (!next.done) {
      try {
        next = it.next(yield fn(next.value))
      } catch (e) {
        next = it.throw(e)
      }
    }
    return next.value
  }
}
