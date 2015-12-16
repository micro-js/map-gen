/**
 * Modules
 */

var isGeneratorObject = require('@f/is-generator-object')
var slice = require('@f/slice')

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
  var self = this
  return function * () {
    var it = isGeneratorObject(gen) ? gen : gen.apply(self, slice(arguments))
    var next = it.next()
    var i = 0

    while (!next.done) {
      try {
        next = it.next(yield fn.call(self, next.value, i++))
      } catch (e) {
        next = it.throw(e)
      }
    }
    return next.value
  }
}
