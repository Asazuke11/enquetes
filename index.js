'use strict';
const http = require('http');
const router = require('./lib/router');

const server = http.createServer((req, res) => {
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