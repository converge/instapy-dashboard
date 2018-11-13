const express = require('express')
const app = express()
let port = 3001
const bodyParser = require('body-parser')
const Database = require('better-sqlite3')
const cors = require('cors')

INSTAPY_DB_LOCATION = ''

const db = new Database(INSTAPY_DB_LOCATION)

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

app.get('/get_all_activities', function(req, res) {
  try {
    const stmt = db.prepare(
      (
        "SELECT recActivity.rowid, prof.name, recActivity.likes, \
         recActivity.comments, recActivity.follows, recActivity.unfollows, \
         recActivity.server_calls, strftime('%Y-%m-%d', recActivity.created) as day_filter  \
         FROM recordActivity as recActivity LEFT JOIN profiles as prof \
         ON recActivity.profile_id = prof.id \
         GROUP BY day_filter, prof.name"
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

app.listen(port)

app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

console.log('REATFul API running on port: ' + port)