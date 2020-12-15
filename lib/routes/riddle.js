'use strict'
const Boom = require('@hapi/boom')

module.exports = [{
  method: 'POST',
  path: '/riddles',
  options: {
    handler: async (request, h) => {
      const { Riddle } = request.server.app.models
      const riddle = Riddle(request.payload)
      return await riddle.save()
    }
  }
}, {
  method: 'GET',
  path: '/riddles/{slug}',
  options: {
    handler: async (request, h) => {
      const { Riddle } = request.server.app.models
      const { slug } = request.params
      const riddle = await Riddle.findOne({ slug })

      if (!riddle) {
        throw Boom.notFound('Sorry, that riddle doesn\'t exist (yet)'
        )
      }

      return riddle.answer
    }
  }
}, {
  method: 'GET',
  path: '/riddles',
  options: {
    handler: async (request, h) => {
      const { Riddle } = request.server.app.models
      const riddles = await Riddle.find({})

      const randomIndex = Math.floor(Math.random() * riddles.length)
      const randomRiddle = riddles[randomIndex]

      return `${randomRiddle.slug} - ${randomRiddle.question}`
    }
  }
}, {
  method: 'PUT',
  path: '/riddles/{slug}',
  options: {
    handler: async (request, h) => {
      const { Riddle } = request.server.app.models
      const { slug } = request.params
      const riddle = await Riddle.findOneAndUpdate({ slug }, { ...request.payload }, { new: true })
      return riddle
    }
  }
}]
