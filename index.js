'use strict';
const http = require('http');
const auth = require('http-auth');
const pug = require('pug');
const Post = require('./post');
// const basic = auth.basic(
//   { realm: 'Enquetes Area.' },
//   (username, password, callback) => {
//     callback(username === 'guest' && password === 'xaXZJQmE');
//   });

const server = http.createServer((req, res) => {
	switch (req.method) {
		case 'GET':
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8'
			});
			if (req.url === '/') {
				res.write(pug.renderFile('./views/form.pug', {
					title: "N予備校プログラミング入門-Webアプリ",
					Q: "ここでつまづいた！",
					Q_small: "つまずいた方は、どの項でつまずきましたか？"
				}));
			}
			if (req.url === '/chapter0') {
				res.write(pug.renderFile('./views/form0.pug'));
			}
			if (req.url === '/chapter1') {
				res.write(pug.renderFile('./views/form1.pug', {
					Q: "躓いた項を選択してください"
				}));
			}
			if (req.url === '/chapter2') {
				res.write(pug.renderFile('./views/form2.pug', {
					Q: "躓いた項を選択してください"
				}));
			}
			if (req.url === '/chapter3') {
				res.write(pug.renderFile('./views/form3.pug', {
					Q: "躓いた項を選択してください"
				}));
			}
			if (req.url === '/chapter4') {
				res.write(pug.renderFile('./views/form4.pug', {
					Q: "躓いた項を選択してください"
				}));
			}
			if (req.url === '/logout') {
				res.writeHead(401, {
					'Content-Type': 'text/plain; charset=utf-8'
				});
				res.end('ログアウトしました');
				return;
			}
			res.end();
			break;
		case 'POST':
			let body = [];
			req.on('data', (chunk) => {
				body.push(chunk);
			}).on('end', () => {
				body = Buffer.concat(body).toString();
				const decoded = decodeURIComponent(body);
				const enquetes = decoded.split('enq=')[1];
				const enquetes_chap = enquetes.split('&coment=')[0];
				const enquetes_come = enquetes.split('&coment=')[1];
				Post.create({
					content: enquetes_come,
					chapter: enquetes_chap,
					postedBy: req.connection.remoteAddress
				}).then(() => {
					Redirect(req, res);
				});
			});
			break;
		default:
			break;
	}
}).on('error', (e) => {
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
	console.error('[' + new Date() + '] Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.info('[' + new Date() + '] Listening on ' + port);
});

function Redirect(req, res) {
	res.writeHead(303, {
		'Location': './'
	});
	res.end();
}