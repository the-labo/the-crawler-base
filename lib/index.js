/**
 * Base of the-crawlers
 * @module the-crawler-base
 */
'use strict'

const TheCrwl = require('./TheCrwl')
const create = require('./create')

const lib = create.bind(this)

Object.assign(lib, {
  TheCrwl,
  create
})

module.exports = lib
