const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('./configuration')
const INSTAPY_DB_LOCATION = `${config.instaPyFolder}/db/instapy.db`
const utils = require('./utils')
const Sequelize = require('sequelize')

// SQLITE connection
const sequelize = new Sequelize(`sqlite:${INSTAPY_DB_LOCATION}`, { operatorsAliases: false })

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
});

// Authorizes log update
const serverHost = config.allowedHosts
io.origins((origin, callback) => {
  if (serverHost.indexOf(origin) === -1) {
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
const logsFolder = utils.getLogsFolder(config.instaPyFolder)
let logFiles = []
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
    const Tail = require('tail').Tail
    const options = { logger: console, useWatchFile: true }
    const tail = new Tail(fullFilePath.path, options)
    tail.watch()

    tail.on('line', function (data) {
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

app.get('/get_all_activities', function (req, res) {
  try {
    sequelize.query("SELECT recActivity.rowid, \
prof.id as profile_id, \
prof.name, \
sum(recActivity.likes) as likes, \
sum(recActivity.comments) as comments, \
sum(recActivity.follows) as follows, \
sum(recActivity.unfollows) as unfollows, \
sum(recActivity.server_calls) as server_calls, \
strftime('%Y-%m-%d', recActivity.created) as day_filter \
FROM recordActivity as recActivity \
LEFT JOIN profiles as prof \
ON recActivity.profile_id = prof.id \
GROUP BY prof.id \
ORDER BY recActivity.created desc", {type: sequelize.QueryTypes.SELECT}).then(rows => {
                        return res.status(200).json(rows)
                    }).catch(err => {
                        console.log('error: ', err)
                        return res.status(500).send('Something went wrong')
                    })
  } catch (err) {
    console.log('error: ', err)    
    return res.status(500).send('Something went wrong')
  }
})

app.get('/get_all_user_statistics', function(req, res) {
  try {
    sequelize.query("SELECT rowid, followers, following, total_posts, max(created), \
                     strftime('%Y-%m-%d', created) as day \
                     FROM accountsProgress \
                     WHERE profile_id = ? \
                     GROUP BY day \
                     ORDER BY created asc",
                     {type: sequelize.QueryTypes.SELECT,
                      raw: true,
                      replacements: [req.query.profileId]
                    }).then(rows => {
                      return res.status(200).json(rows)
                    }).catch(err => {
                      console.log('error: ', err)
                      return res.status(500).send('Something went wrong')
                    })
    } catch (err) {
      console.log('error: ', err)      
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