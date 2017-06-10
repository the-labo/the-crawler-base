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
      s._resources = {}
    }

    /**
     * Check has resource with name
     * @param {string} name - Name of resource
     * @returns {boolean}
     */
    hasResource (name) {
      const s = this
      return s._resources.hasOwnProperty(name)
    }

    /**
     * Get a resource with name
     * @param {string} name - Name of resource
     */
    getResource (name) {
      const s = this
      return s._resources[ name ]
    }

    /**
     * Add a resource with name
     * @param {string} name - Name of resource
     * @param {Resource} resource
     */
    setResource (name, resource) {
      const s = this
      s._resources[ name ] = resource
    }

    /**
     * Remove a resource of the-db
     * @param {string} name - Name of resource
     */
    delResource (name) {
      const s = this
      delete s._resources[ name ]
    }

    /**
     * Save resource entity
     * @param {string} resourceName - Name of resource
     * @param {string} id - Resource id
     * @param {Object} attributes - Attributes to save
     * @returns {Promise.<void>}
     */
    async saveResourceEntity (resourceName, id, attributes) {
      const s = this
      if (!s.hasResource(resourceName)) {
        throw new Error(`[TheCwl] Resource not found for name: ${resourceName}`)
      }
      const resource = s.getResource(resourceName)
      let duplicate = await resource.has(id)
      if (duplicate) {
        return
      }
      let entity = Object.assign({}, attributes, { id })
      await resource.create(entity, {
        allowReserved: true
      })
    }
  }

  return ResourceMixed
}

module.exports = resourceMix
