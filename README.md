# gobble-html-minifer

[![npm](https://badge.fury.io/js/gobble-html-minifier.svg)](https://www.npmjs.com/package/gobble-html-minifier)
[![Build Status](https://img.shields.io/travis/justin-lau/gobble-html-minifier/v0.1.1.svg)](https://travis-ci.org/justin-lau/gobble-html-minifier)
[![Coverage Status](https://img.shields.io/coveralls/justin-lau/gobble-html-minifier/v0.1.1.svg)](https://coveralls.io/github/justin-lau/gobble-html-minifier?branch=v0.1.1)
[![Dependencies](https://david-dm.org/justin-lau/gobble-html-minifier/v0.1.1.svg)](https://david-dm.org/justin-lau/gobble-html-minifier/v0.1.1)

Simple wrapper to use [html-minifier](https://github.com/kangax/html-minifier) with [gobble](https://github.com/gobblejs/gobble).

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. Then,

```bash
npm install --save-dev gobble-html-minifier
```

## Usage

**gobblefile.js**

```js
var gobble = require('gobble');

module.exports = gobble('src').transform('html-minifier', options);
```

The `options` argument, if specified, is passed to `html-minifier`. Please refer to the [original documentation](https://github.com/kangax/html-minifier#options-quick-reference).

There is one extra option `preset` in this plugin to try to make developer's life easier.

### preset
Type: `string|undefined`

The `preset` option accepts one of three string value: `"minimal"`, `"safe"`, and `"all"`. They correspond to the presets found on [html-minifier's Github page](https://kangax.github.io/html-minifier/). If left undefined or when set to unsupported value, it doesn't affect other options at all. Otherwise, the preset options act as the default and other options passed in overrides the preset.

#### Usage

```js
// to use the "minimal" preset alone
gobble('src').transform('html-minifier', { preset: 'minimal' });

// use the "minimal" preset but turn off "removeComments"
gobble('src').transform('html-minifier', {
  preset: 'minimal',
  removeComments: false,
});
```
