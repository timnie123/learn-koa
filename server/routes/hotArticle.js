const Router = require("@koa/router");
const router = new Router();

const { search } = require('../controllers/HotArticle');

router.get('/api/hotArticle/exmoo/news', search);


module.exports = router;
