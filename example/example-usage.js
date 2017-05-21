'use strict'

const { TheCrawl } = require('the-crawler-base')
const theDB = require('the-db')

async function tryExample () {
  let db = theDB({ /* ... */ })

  class SiteCrawl extends TheCrawl {
    /* ... */
  }

}

tryExample().catch((err) => console.error(err))
