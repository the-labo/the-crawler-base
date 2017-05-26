/**
 * Base crawler class
 * @abstract
 * @class TheCrwl
 */
'use strict'

const debug = require('debug')('the:crawl')
const { EventEmitter } = require('events')

const notImplementedError = () => new Error('Not implemented!')

/** @lends TheCrwl */
class TheCrwl extends EventEmitter {
  constructor (resource) {
    super()
    const s = this
    s.resource = resource
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
    const { resource } = s

    let entities = await s.crawl(config)
    for (let entity of entities) {
      let duplicate = await resource.has(entity.id)
      if (duplicate) {
        continue
      }
      await resource.create(entity, {
        allowReserved: true
      })
    }
  }
}

module.exports = TheCrwl
