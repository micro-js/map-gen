
# map-gen

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Map for generator.

## Installation

    $ npm install @f/map-gen

## Usage

```js
var map = require('@f/map-gen')

Array.from(map(addOne, function * () {
  yield 1
  yield 2
  yield 3
})) // [2, 3, 4]

function addOne(v) {
  return v + 1
}
```

## API

### mapGen(fn, gen)

- `fn` - mapping function
- `gen` - generates values to map

**Returns:** generator of mapped values

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/map-gen.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/map-gen
[git-image]: https://img.shields.io/github/tag/micro-js/map-gen.svg
[git-url]: https://github.com/micro-js/map-gen
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/map-gen.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/map-gen
