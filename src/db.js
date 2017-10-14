'use strict'

const level = require('level')

const path = './db'

let dbs = {}
let options = {}

exports = module.exports = function (key) {
  if (!dbs[key]) {
    throw new Error('Database not registered: ' + key)
  }
  return dbs[key]
}

exports.register = function (key, opt) {
  if (dbs[key]) {
    throw new Error('Database already registered: ' + key)
  }

  const dbPath = path + '/' + key
  let db = level(dbPath, {
    createIfMissing: true,
    valueEncoding: 'json'
  })

  dbs[key] = db
  options[key] = opt

  return db
}