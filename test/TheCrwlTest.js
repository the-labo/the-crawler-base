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

    db.load(class ArticleResource extends theDB.Resource {

    }, 'Article')

    const { Article } = db.resources

    class NewsCrwl extends TheCrwl {
      crawl () {
        return [
          { resource: 'Article', id: 1, attributes: { name: 'title01' } },
          { resource: 'Article', id: 2, attributes: { name: 'title01' } },
          { resource: 'Article', id: 2, attributes: { name: 'title01' } } // Duplicate
        ]
      }
    }

    let crwl = new NewsCrwl()
    crwl.setResource('Article', Article)
    await crwl.run()

    let { entities } = await Article.list()
    equal(entities.length, 2)

    crwl.delResource('Article')

  })
})

/* global describe, before, after, it */
