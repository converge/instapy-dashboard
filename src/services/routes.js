require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const routes = require('express').Router()
const Sequelize = require('sequelize')
const INSTAPY_FOLDER = process.env.INSTAPY_FOLDER

// Database connection
const sequelize = new Sequelize(
  `sqlite:${INSTAPY_FOLDER}/db/instapy.db`
)

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

// ROUTES
// Return activies from all users on our database
routes.get('/get_all_activities', function (req, res) {
  try {
    sequelize.query(
      `SELECT recActivity.rowid,
               prof.id as profile_id,
               prof.name,
               sum(recActivity.likes) as likes,
               sum(recActivity.comments) as comments,
               sum(recActivity.follows) as follows,
               sum(recActivity.unfollows) as unfollows,
               sum(recActivity.server_calls) as server_calls,
               strftime('%Y-%m-%d', recActivity.created) as day_filter
      FROM recordActivity as recActivity 
      LEFT JOIN profiles as prof ON recActivity.profile_id = prof.id
      GROUP BY day_filter, profile_id
      ORDER BY recActivity.created desc`,
      { type: sequelize.QueryTypes.SELECT }).then(rows => {
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

// Return activities from specific users
routes.get('/get_all_user_statistics', function (req, res) {
  try {
    sequelize.query(
      `SELECT rowid,
              followers,
              following,
              total_posts,
              max(created),
              strftime('%Y-%m-%d', created) as day
      FROM accountsProgress
      WHERE profile_id = ?
      GROUP BY day
      ORDER BY created asc`,
      {
        type: sequelize.QueryTypes.SELECT,
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

// 404, when no route was found
routes.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
})

module.exports = routes