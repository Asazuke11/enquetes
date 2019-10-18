'use strict';
const postsHandler = require('./posts-handler');
const pug = require('pug');

function route(req, res) {
  switch (req.url) {
    case '/':
        postsHandler.handle(req, res);
        break;
    case '/chapter0':
        postsHandler.handle(req, res);
        break;
    case '/chapter1':
      postsHandler.handle(req, res);
      break;
    case '/chapter2':
      postsHandler.handle(req, res);
      break;
    case '/chapter3':
      postsHandler.handle(req, res);
      break;
    case '/chapter4':
      postsHandler.handle(req, res);
      break;
    default:
      break;
  }
}

module.exports = {
  route
}