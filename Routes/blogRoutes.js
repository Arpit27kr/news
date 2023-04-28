const express = require('express');
const blogRoute = express();
const blogController = require('../Controllers/blogController');
const bodyParser = require('body-parser');

blogRoute.use(bodyParser.json());
blogRoute.set('view engine','ejs');
blogRoute.set('views','./Views');

blogRoute.set(express.static('Public'));

blogRoute.get('/',blogController.loadBlog);

blogRoute.get('/post/:id',blogController.loadPost);

blogRoute.post('/addComment',blogController.addComment);

module.exports = blogRoute;