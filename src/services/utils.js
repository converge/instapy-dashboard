const fs = require('fs')
const path = require('path')

// load all InstaPy folders, next we will be able to load
// general.log file for each account
module.exports = {
  getLogsFolder: function (instapyFolder) {
    instapyFolder += '/logs'
    const folders = fs.readdirSync(instapyFolder).filter((file) =>
      fs.lstatSync(path.join(instapyFolder, file)).isDirectory())
    return folders
  }
}
