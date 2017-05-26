/**
 * Test for TheCrwl.
 * Runs with mocha.
 */
'use strict'

const TheCrwl = require('../lib/TheCrwl')
const theDB = require('the-db')
const { ok, equal } = require('assert')

describe('the-crwl', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const db = theDB({})

    const Article = db.resource('Article')

    class NewsCrawl extends TheCrwl {
      crawl () {
        return [
          { id: 1, name: 'title01' },
          { id: 2, name: 'title01' }
        ]
      }
    }

    let crawl = new NewsCrawl()
    crawl.addResource(Article)
    await crawl.run()

    let { entities } = await Article.list()
    equal(entities.length, 2)

    crawl.removeResource(Article)
  })
})

/* global describe, before, after, it */
