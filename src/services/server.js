require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const app = require('./app')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const utils = require('./utils')
const port = process.env.NODE_PORT || 3000

const allowedHosts = process.env.ALLOWED_HOSTS.split(' ')
// Set who can access socket.io data
io.origins((origin, callback) => {
  if (allowedHosts.indexOf(origin) === -1) {
    return callback('origin not allowed', false)
  }
  callback(null, true)
})

// Build log file structure, we're creating a new object containing
// accout name and log file path
const logsFolder = utils.getLogsFolder(process.env.INSTAPY_FOLDER)
let logFiles = []
logsFolder.forEach((accountName) => {
  if (accountName !== 'relationship_data') {
    logFiles.push({
      account: accountName,
      path: `${process.env.INSTAPY_FOLDER}/logs/${accountName}/general.log`
    })
  }
})

// Links InstaPy logs files to socket.io events
io.on('connection', function (socket) {
  logFiles.forEach((fullFilePath) => {
    const Tail = require('tail').Tail
    const options = { logger: console, useWatchFile: true }
    const tail = new Tail(fullFilePath.path, options)
    // watch InstaPy log files
    tail.watch()

    // when new line added to log file
    tail.on('line', function (data) {
      // emit new event to listening sockets (socket.io)
      socket.emit('newLogData', {
        account: fullFilePath.account,
        msg: data.toString('utf-8')
      })
    })
    tail.on('error', function (error) {
      console.log(error)
    })
  })
})

http.listen(port)

console.log('RESTful API running on port: ' + port)