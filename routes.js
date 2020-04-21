const routes = require('next-routes')
module.exports = routes()
.add('days','/day/two/:time', 'days')