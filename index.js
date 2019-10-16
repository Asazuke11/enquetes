'use strict';
const http = require('http');
const pug = require('pug');


const server = http.createServer((req, res) => {
	const now = new Date();
	let answer = [];
	console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8'
	});

	switch (req.method) {
		case 'GET':
			if (req.url === "/") {
				res.write(pug.renderFile('./form.pug', {
					title: "N予備校プログラミング入門-Webアプリ",
					Q: "ここでつまづいた！",
					Q_small:"どの項で躓きましたか？"
				}
				));
			}
			if (req.url === "/0") {
				res.write(pug.renderFile('./form0.pug'));
			}
			if (req.url === "/1st") {
				res.write(pug.renderFile('./form1.pug',{
					Q:"躓いた項を選択してください"
				}));
			}
			if (req.url === "/2nd") {
				res.write(pug.renderFile('./form2.pug',{
					Q:"躓いた項を選択してください"
				}));
			}
			if (req.url === "/3rd") {
				res.write(pug.renderFile('./form3.pug',{
					Q:"躓いた項を選択してください"
				}));
			}
			if (req.url === "/4th") {
				res.write(pug.renderFile('./form3.pug',{
					Q:"躓いた項を選択してください"
				}));
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
				answer.push(decoded);
				console.info(`投稿:${decoded}`);
				console.log(answer);
				Redirect(req, res);
        res.end();
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
		'Location': '/'
	});
	res.end();
}