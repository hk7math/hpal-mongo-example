'use strict'

const HauteCouture = require('haute-couture')
const Package = require('../package.json')
const Mongoose = require('mongoose')

module.exports = {
  name: 'hpal-mongo',
  register: async (server, options) => {
    // When registering this plugin pass something like this as plugin options:
    // { mongoURI: 'mongodb://localhost/test' }

    server.app.connection = await Mongoose.connect(
      options.mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      }
    )

    await HauteCouture.using()(server, options)
  }
}

exports.plugin = {
  pkg: Package,
  register: async (server, options) => {
    // Custom plugin code can go here

    await HauteCouture.using()(server, options)
  }
}
