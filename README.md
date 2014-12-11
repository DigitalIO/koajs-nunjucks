Koa.js Nunjucks
===============
  [![NPM Version][npm-image]][npm-url]
  [![Node Version][node-image]][npm-url]
  [![License][license-image]][npm-url]

## Installation
```
$ npm install koajs-nunjucks
```

## Middleware Setup
First, require koajs-nunjucks. It returns a function that will return a middleware generator.

```js
var KoajsNunjucks = require('koajs-nunjucks');
var fMiddleware = KoajsNunjucks('', {});
```

The function takes two arguments. They are passed in the same order to the [nunjucks.configure()](http://mozilla.github.io/nunjucks/api.html#configure) function.
Next, "use" the middleware function (before any other middleware that attempts to use it).

```js
var app = require('koa')();
app.use( fMiddleware );
```

## Usage
The render function is attached to the Koa context. It is availiable in other middleware functions directly as "this". The function renders the view and automatically sets it as the response body. 

```js
yield this.render('home.nj', { username: 'Bob' });
```
The render function takes two arguments as defined by [nunjucks.render](http://mozilla.github.io/nunjucks/api.html#render). It does NOT take a callback.

In additon to the render function, the [enviorment](http://mozilla.github.io/nunjucks/api.html#environment) is also attached to the context. 
Every request creates a fresh enviorment. 
```js
this.nunjucks
```

# License
MIT

[npm-image]: https://img.shields.io/npm/v/koajs-nunjucks.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koajs-nunjucks?style=flat-square
[license-image]: https://img.shields.io/npm/l/koajs-nunjucks.svg?style=flat-square
[node-image]: https://img.shields.io/node/v/koajs-nunjucks.svg?style=flat-square
