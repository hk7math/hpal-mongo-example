'use strict'

const Mongoose = require('mongoose')

const riddleSchema = new Mongoose.Schema({
  slug: String,
  question: String,
  answer: String
})

module.exports = {
  name: 'Riddle',
  schema: riddleSchema
}
