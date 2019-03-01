const cors = require('cors')
const express = require('express')

class AppController {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    // JSON middleware
    // The function listens for req.on(‘data’) and
    // constructs req.body in JSON format
    this.express.use(express.json())

    // set CORS
    this.express.use(cors({credentials: true, origin: true}))
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express