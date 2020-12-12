'use strict'

const Dotenv = require('dotenv')
const Confidence = require('confidence')
const Toys = require('toys')

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` })

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: 'localhost',
    port: {
      $env: 'PORT',
      $coerce: 'number',
      $default: 3000
    },
    debug: {
      $filter: { $env: 'NODE_ENV' },
      $default: {
        log: ['error'],
        request: ['error']
      },
      production: {
        request: ['implementation']
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: '../lib', // Main plugin
        options: {
          mongoURI: process.env.MONGO_URL
        }
      },
      {
        plugin: {
          $filter: { $env: 'NODE_ENV' },
          $default: 'hpal-debug',
          production: Toys.noop
        }
      },
      {
        plugin: require('@hapi/good'),
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            console: [{
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{
                error: '*', response: '*', log: '*', request: '*'
              }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout']
          }
        }
      }
    ]
  }
})
