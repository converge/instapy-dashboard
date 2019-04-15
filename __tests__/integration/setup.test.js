require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const fs = require('fs')

describe('Check if .env is setup corretly', () => {
  it('should locate InstaPy database', () => {
    dbFile = `${process.env.INSTAPY_FOLDER}/db/instapy.db`
    expect(fs.existsSync(dbFile)).toBeTruthy()
  })

  it('should locate InstaPy log folder', () => {
    logsFolder = `${process.env.INSTAPY_FOLDER}/logs/`
    expect(fs.existsSync(logsFolder)).toBeTruthy()
  })
})
