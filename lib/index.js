/**
 * Base of the-crawlers
 * @module the-crawler-base
 */
'use strict'

const TheCrwl = require('./TheCrwl')
const create = require('./create')
const Constants = require('./Constants')

const lib = create.bind(this)

Object.assign(lib, Constants, {
  TheCrwl,
  create,
  Constants
})

module.exports = lib
