/**
 * Base crawler class
 * @abstract
 * @class TheCrawl
 */
'use strict'

const debug = require('debug')('the:crawl')
const { EventEmitter } = require('events')

const notImplementedError = () => new Error('Not implemented!')

/** @lends TheCrawl */
class TheCrawl extends EventEmitter {
  constructor (resource) {
    super()
    const s = this
    s.resource = resource
  }

  /**
   * Do crawl
   * @param {Object} params
   * @returns {Promise.<Array>} Entities
   */
  async crawl (params) {
    throw notImplementedError()
  }

  /**
   * Run the crawler
   * @param {Object} params
   * @returns {Promise.<void>}
   */
  async run (params) {
    const s = this
    const { resource } = s

    let entities = await s.crawl(params)
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

module.exports = TheCrawl
