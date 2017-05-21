/**
 * Test for TheCrawl.
 * Runs with mocha.
 */
'use strict'

const TheCrawl = require('../lib/TheCrawl')
const theDB = require('the-db')
const { ok, equal } = require('assert')

describe('the-crawl', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    const db = theDB({})

    const Article = db.resource('Article')

    class NewsCrawl extends TheCrawl {
      crawl () {
        return [
          { id: 1, name: 'title01' },
          { id: 2, name: 'title01' }
        ]
      }
    }

    let crawl = new NewsCrawl(Article)
    await crawl.run()

    let { entities } = await Article.list()
    equal(entities.length, 2)
  })
})

/* global describe, before, after, it */
