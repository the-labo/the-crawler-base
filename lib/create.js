/**
 * Create a TheCrwl instance
 * @function create
 * @param {...*} args
 * @returns {TheCrwl}
 */
'use strict'

const TheCrwl = require('./TheCrwl')

/** @lends create */
function create (...args) {
  return new TheCrwl(...args)
}

module.exports = create
