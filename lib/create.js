/**
 * Create a TheCrawl instance
 * @function create
 * @param {...*} args
 * @returns {TheCrawl}
 */
'use strict'

const TheCrawl = require('./TheCrawl')

/** @lends create */
function create (...args) {
  return new TheCrawl(...args)
}

module.exports = create
