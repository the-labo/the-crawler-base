'use strict'

const { TheCrwl } = require('the-crawler-base')
const theDB = require('the-db')

async function tryExample () {
  let db = theDB({ /* ... */ })

  class MyCrwl extends TheCrwl {
    async crawl (config = {}) {
      /* ... */
      return [
        { resource: 'Site', id: 1, attributes: { /* ... */ } },
        { resource: 'Article', id: 1, attributes: { /* ... */ } }
      ]
    }
  }

  let crwl = new MyCrwl({})
  crwl.setResource('Site', db.resource('Site'))
  crwl.setResource('Article', db.resource('Article'))

  /* ... */
}

tryExample().catch((err) => console.error(err))
