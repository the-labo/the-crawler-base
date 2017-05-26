/**
 * Mix up resource
 * @function resourceMix
 * @param {function} BaseClass - Base class
 * @returns {function} Mixed class
 */
'use strict'

/** @lends resourceMix */
function resourceMix (BaseClass) {
  class ResourceMixed extends BaseClass {
    constructor (...args) {
      super(...args)
      const s = this
      s._resources = []
    }

    /**
     * Add a resource of the-db
     * @param {Resource} resource
     */
    addResource (resource) {
      const s = this
      s._resources.push(resource)
    }

    /**
     * Remove a resource of the-db
     * @param {Resource} resource
     */
    removeResource (resource) {
      const s = this
      s._resources = s._resources.filter((filtering) => filtering !== resource)
    }

    /**
     * Save resource entity
     * @param {Object} entity
     * @returns {Promise.<void>}
     */
    async saveResourceEntity (entity) {
      const s = this
      for (let resource of s._resources) {
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

  return ResourceMixed
}

module.exports = resourceMix
