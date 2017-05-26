/**
 * Base crawler class
 * @abstract
 * @class TheCrwl
 */
'use strict'

const debug = require('debug')('the:crawl')
const { EventEmitter } = require('events')
const { resourceMix } = require('./mixins')

const notImplementedError = () => new Error('Not implemented!')

const TheCrwlBase = [
  resourceMix
].reduce((Clazz, mix) => mix(Clazz), EventEmitter)

/** @lends TheCrwl */
class TheCrwl extends TheCrwlBase {
  constructor () {
    super()
    const s = this
  }

  /**
   * Do crawl
   * @param {Object} [config={}] - Crawl config
   * @returns {Promise.<Array>} Entities
   */
  async crawl (config = {}) {
    throw notImplementedError()
  }

  /**
   * Run the crawler
   * @param {Object} [config={}] - Crawl config
   * @returns {Promise.<void>}
   */
  async run (config = {}) {
    const s = this
    let entities = await s.crawl(config)
    for (let entity of entities) {
      debug('Saving entity', entity)
      await s.saveResourceEntity(entity)
    }
  }
}

module.exports = TheCrwl
