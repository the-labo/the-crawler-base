/**
 * Base crawler class
 * @abstract
 * @class TheCrwl
 */
'use strict'

const { CrawlerEvents } = require('./Constants')
const argx = require('argx')
const debug = require('debug')('the:crawl')
const { EventEmitter } = require('events')
const { resourceMix } = require('./mixins')
const { camelcase } = require('stringcase')

const { ENTITY_SAVED } = CrawlerEvents
const notImplementedError = () => new Error('Not implemented!')

const TheCrwlBase = [
  resourceMix
].reduce((Clazz, mix) => mix(Clazz), EventEmitter)

/** @lends TheCrwl */
class TheCrwl extends TheCrwlBase {
  constructor (name, options = {}) {
    super()
    const args = argx(arguments)
    const s = this
    name = args.shift('string')
    options = args.shift('object') || {}
    s.name = name || options.name || camelcase(s.constructor.name)
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
    let results = await s.crawl(config)
    for (let result of results) {
      let { resource, id, attributes } = result
      debug('Saving entity', { id })
      let entity = await s.saveResourceEntity(resource, id, Object.assign(attributes, {
        $crwl: s.name
      }))
      debug('Entity saved', entity)
      s.emit(ENTITY_SAVED, { entity })
    }
  }
}

module.exports = TheCrwl
