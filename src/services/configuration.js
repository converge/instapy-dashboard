
/***
 * local network usage example:
 * serverHost: 'http://192.168.0.100:3001',
 * allowedHosts: ['http://192.168.0.100:3000']
 */

const config = {
  // InstaPy root folder
  instaPyFolder: '/Users/converge/InstaPy',
  // the server IP (the one who run npm start)
  serverHost: 'http://localhost:3001',
  allowedHosts: ['http://localhost:3000', 'http://192.168.0.100:3000']
}
module.exports = config
