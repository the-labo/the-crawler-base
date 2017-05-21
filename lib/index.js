/**
 * Base of the-crawlers
 * @module the-crawler-base
 */
'use strict'

const TheCrawl = require('./TheCrawl')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, {
  TheCrawl,
  create
})

module.exports = lib
