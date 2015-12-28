/**
 * Imports
 */

var map = require('..')
var test = require('tape')
var identity = require('@f/identity')

/**
 * Tests
 */

test('should handle no yield', (t) => {
  var it = map(identity, justReturn)()
  var next = it.next()
  t.equal(next.value, 'foo')
  t.equal(next.done, true)
  t.end()

  function * justReturn () {
    return 'foo'
  }
})

test('should handle only yield', (t) => {
  var it = map(identity, justYield)()
  var next = it.next()
  t.equal(next.value, 'foo')
  t.equal(next.done, false)
  next = it.next()
  t.equal(next.value, undefined)
  t.equal(next.done, true)
  t.end()

  function * justYield () {
    yield 'foo'
  }
})

test('should yield input values', (t) => {
  var it = map(identity, yieldIn)('in')

  t.equal(it.next().value, 'in')
  t.equal(it.next('foo').value, 'foo')

  var next = it.next('bar')
  t.equal(next.value, 'bar')
  t.equal(next.done, true)

  t.end()

  function * yieldIn (input) {
    var res = yield input
    res = yield res
    return res
  }
})

test('should yield mapped values', (t) => {
  var it = map(add, yieldIn)(0)

  t.equal(it.next().value, 1)
  t.equal(it.next(2).value, 3)

  var next = it.next(10)
  t.equal(next.value, 10)
  t.equal(next.done, true)

  t.end()

  function add (v) {
    return v + 1
  }

  function * yieldIn (input) {
    var res = yield input
    res = yield res
    return res
  }
})

test('should catch errors', (t) => {
  var it = map(identity, error)()
  var next = it.next()
  t.equal(next.value, 'foo')
  next = it.throw(new Error('test'))
  t.equal(next.value, 'bar')
  t.end()
  function * error () {
    try {
      yield 'foo'
    } catch (e) {
      yield 'bar'
    }
  }
})

test('should catch error in mapF', (t) => {
  var it = map(tError, error)()
  var next = it.next()
  t.equal(next.value, 'bar')
  next = it.next()
  t.equal(next.value, undefined)
  t.equal(next.done, true)
  t.end()

  function tError (v) {
    if (v === 'foo') {
      throw new Error('test')
    } else {
      return v
    }
  }

  function * error () {
    try {
      yield 'foo'
    } catch (e) {
      yield 'bar'
    }
  }
})


test('should map yielded throws', (t) => {

  var g = map(add, error)
  var it = g()
  var next = it.next()
  t.equal(next.value, 2)
  next = it.throw()
  t.equal(next.value, 3)
  next = it.next()
  t.equal(next.value, 4)
  t.end()

  function * error () {
    try {
      yield 1
    } catch (e) {
      yield 2
    }
    yield 3
  }

  function add (v) {
    return v + 1
  }
})
