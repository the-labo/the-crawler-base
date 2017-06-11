/**
 * Mix up resource
 * @function resourceMix
 * @param {function} BaseClass - Base class
 * @returns {function} Mixed class
 */
'use strict'

const { refTo } = require('clay-resource-ref')

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
     * @param {Object} [options={}] - Optional settings
     * @returns {?ClayResource} - Resource object
     */
    getResource (name, options = {}) {
      let { strict = false } = options
      const s = this
      let found = s._resources[ name ]
      if (strict) {
        if (!found) {
          throw new Error(`Unknown resource: ${name}`)
        }
      }
      return found
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
     * Get ref for resource
     * @param resourceName
     * @param id
     */
    resourceRefTo (resourceName, id) {
      const s = this
      const resource = s.getResource(resourceName, { strict: true })
      return refTo(resource, id)
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
      let one = await resource.one(id)
      if (one) {
        await resource.update(id, attributes)
      } else {
        let entity = Object.assign({}, attributes, { id })
        await resource.create(entity, {
          allowReserved: true
        })
      }
    }
  }

  return ResourceMixed
}

module.exports = resourceMix
