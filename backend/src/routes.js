const express = require('express');
const routes = express.Router();
const api = require('./api');

routes.get('/comics', api.ListComics);
routes.get('/comics/:comicId', api.ComicInfos);

module.exports = routes;