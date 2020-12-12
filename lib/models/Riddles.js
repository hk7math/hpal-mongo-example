'use strict'

const Mongoose = require('mongoose')
// const History = require('mongoose-patch-history').default

const riddleSchema = new Mongoose.Schema({
  slug: String,
  question: String,
  answer: String
})

// riddleSchema.plugin(History, {
//   mongoose: Mongoose,
//   name: 'riddlePatches'
// })

module.exports = {
  name: 'Riddle',
  schema: riddleSchema
}
