'use strict';
const http = require('http');
const router = require('./lib/router');
const auth = require('http-auth');
const basic = auth.basic(
  { realm: 'Enquetes Area.' },
  (username, password, callback) => {
    callback(username === 'guest' && password === 'xaXZJQmE');
  });

const server = http.createServer(basic,(req, res) => {
	router.route(req,res);
}).on('error', (e) => {
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
	console.error('[' + new Date() + '] Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.info('[' + new Date() + '] Listening on ' + port);
});