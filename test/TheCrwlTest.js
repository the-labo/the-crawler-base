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

    }, 'TheArticle')

    const { TheArticle } = db.resources

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
    crwl.setResource('Article', TheArticle)
    await crwl.run()

    let { entities } = await TheArticle.list()
    equal(entities.length, 2)

    equal(crwl.resourceRefTo('Article', '1'), 'TheArticle#1')

    crwl.delResource('Article')

  })

  it('Crwl name', () => {
    class SomeCrwl extends TheCrwl {

    }
    equal((new SomeCrwl()).name, 'someCrwl')
    equal((new SomeCrwl({ name: 'hoge' })).name, 'hoge')
    equal((new SomeCrwl('hoge')).name, 'hoge')
  })
})

/* global describe, before, after, it */
