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

function map (fn, gen) {
  var self = this
  var mapped = function () {
    var it = isGeneratorObject(gen) ? gen : gen.apply(null, slice(arguments))
    var idx = 0
    var ret

    return {
      next: next,
      throw: error
    }

    function next () {
      ret = it.next.apply(it, slice(arguments))
      if (!ret.done) {
        try {
          ret.value = fn.call(self, ret.value, idx++)
        } catch (e) {
          return error(e)
        }
      }
      return ret
    }

    function error () {
      return it.throw.apply(it, arguments)
    }
  }

  mapped.constructor = GeneratorFunction

  return mapped
}

function GeneratorFunction () {}
