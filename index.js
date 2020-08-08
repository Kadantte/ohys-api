const fastify = require('fastify')

const api = require('./api')
const utils = require('./utils')
const worker = require('./worker')
const config = require('./config')

const app = fastify({
  logger: true
})
const debug = utils.createLogger()

// NOTE: Declare routings
app.register(api.v1, { prefix: 'v1' })

module.exports = (async () => {
  try {
    await app.listen(config.port)

    debug('application is listening on port: ' + config.port)

    // NOTE: Initialize worker
    worker.initialize()
  } catch (error) {
    debug('unexpected error occured while starting application: ' + error)

    process.exit(1)
  }
})()
