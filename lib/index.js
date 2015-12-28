/**
 * Modules
 */

var toGenerator = require('@f/to-generator')
var slice = require('@f/slice')
var isFunction = require('@f/is-function')
var isIterator = require('@f/is-iterator')

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

function map (fn, gen) {
  var ctx = this
  return toGenerator(function () {
    var self = this
    var it = isFunction(gen) ? gen.apply(ctx, slice(arguments)) : gen
    var i = 0

    if (!isIterator(it, true)) {
      throw TypeError('`gen` must return an iterator or be an iterator.')
    }

    self.next = next
    self.throw = error

    function next (arg) {
      return map(it.next(arg))
    }

    function error (err) {
      return map(it.throw(err))
    }

    function map (next) {
      if (next.done) return next
      try {
        next.value = fn.call(ctx, next.value, i++)
      } catch (e) {
        return error(e)
      }
      return next
    }
  })
}
