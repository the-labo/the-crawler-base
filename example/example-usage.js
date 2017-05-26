'use strict'

const { TheCrwl } = require('the-crawler-base')
const theDB = require('the-db')

async function tryExample () {
  let db = theDB({ /* ... */ })

  class SiteCrwl extends TheCrwl {
    /* ... */
  }

  let siteCtwl = new SiteCrwl()
  siteCtwl.addResource(db.resource('Site'))
  /* ... */
}

tryExample().catch((err) => console.error(err))
