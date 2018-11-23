const app = require('express')()
const bodyParser = require('body-parser')
const Database = require('better-sqlite3')
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
// @todo: improve it ->
const instapyRootFolder = '/Users/converge/Documents/workspace/InstaPy'
INSTAPY_DB_LOCATION = `${instapyRootFolder}/db/instapy.db`
const db = new Database(INSTAPY_DB_LOCATION)
var spawn = require('child_process').spawn;
const utils = require('./utils')

// Authorizes localhost
io.origins((origin, callback) => {
  if (origin !== 'http://localhost:3000') {
    return callback('origin not allowed', false);
  }
  callback(null, true);
});

// Body Parser returns a function that acts as middleware. 
// The function listens for req.on(‘data’) and constructs req.body
// from the chunks of data it gets.
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(cors())

// build log file structure
logsFolder = utils.getLogsFolder(instapyRootFolder)
logFiles = []
logsFolder.map((accountName) => {
  if (accountName !== 'relationship_data') {
    logFiles.push({
      account: accountName,
      path: `${instapyRootFolder}/logs/${accountName}/general.log`
    })
  }
})

io.on('connection', function (socket) {
  logFiles.map((fullFilePath) => {
    Tail = require('tail').Tail
    options = { logger: console, useWatchFile: true }
    tail = new Tail(fullFilePath.path, options)
    tail.watch()

    tail.on('line', function (data) {
      socket.emit('newLogData', { 
        account: fullFilePath.account,
        msg: data.toString('utf-8') 
      })
    })
  })

  tail.on('error', function (error) {
    console.log(error)
  })

})

app.get('/get_all_activities', function (req, res) {
  try {
    const stmt = db.prepare(
      (
        "SELECT recActivity.rowid, prof.name, recActivity.likes, \
         recActivity.comments, recActivity.follows, recActivity.unfollows, \
         recActivity.server_calls, strftime('%Y-%m-%d', recActivity.created) as day_filter  \
         FROM recordActivity as recActivity LEFT JOIN profiles as prof \
         ON recActivity.profile_id = prof.id \
         GROUP BY day_filter, prof.name ORDER BY recActivity.created desc"
      )
    )
    const rows = stmt.all()
    return res.status(200).json({
      data: rows
    })
  } catch (err) {
    return res.status(500).send('Something went wrong')
  }
})

let port = 3001
http.listen(port)

app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

console.log('REATFul API running on port: ' + port)