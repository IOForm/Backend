const app = require('../app');
const http = require('http');
const port = process.env.PORT || 4000
http.createServer(app).listen(port)

