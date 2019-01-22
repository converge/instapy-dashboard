const app = require('express')()
const bodyParser = require('body-parser')
const Database = require('better-sqlite3')
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('./configuration')
INSTAPY_DB_LOCATION = `${config.instaPyFolder}/db/instapy.db`
const db = new Database(INSTAPY_DB_LOCATION)
const utils = require('./utils')

// Authorizes log update
const serverHost = config.allowedHosts
io.origins((origin, callback) => {
  // allow only authorized hosts to access log files
  if (serverHost.indexOf(origin) !== -1) {
    return callback(null, true)
  } else {
    return callback('origin not allowed', false);
  }
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
app.use(cors({
  origin: function(origin, callback) {
    if (serverHost.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(null, true);
      // return callback('origin not allowed!', false);
    }
  }
}))

// build log file structure
logsFolder = utils.getLogsFolder(config.instaPyFolder)
logFiles = []
logsFolder.map((accountName) => {
  if (accountName !== 'relationship_data') {
    logFiles.push({
      account: accountName,
      path: `${config.instaPyFolder}/logs/${accountName}/general.log`
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
        "SELECT recActivity.rowid, prof.id as profile_id, prof.name, sum(recActivity.likes) as likes, \
         sum(recActivity.comments) as comments, sum(recActivity.follows) as follows, \
         sum(recActivity.unfollows) as unfollows, sum(recActivity.server_calls) as server_calls, \
         strftime('%Y-%m-%d', recActivity.created) as day_filter \
         FROM recordActivity as recActivity LEFT JOIN profiles as prof \
         ON recActivity.profile_id = prof.id \
         GROUP BY day_filter ORDER BY recActivity.created desc"
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

app.get('/get_all_user_statistics', function(req, res) {
  try {
    const stmt = db.prepare(
      (
        "SELECT rowid, followers, following, total_posts, max(created), \
        strftime('%Y-%m-%d', created) as day \
        FROM accountsProgress \
        WHERE profile_id = ? \
        GROUP BY day \
        ORDER BY created asc"
      )
    )
    const rows = stmt.all(req.query.profileId)
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

console.log('RESTful API running on port: ' + port)