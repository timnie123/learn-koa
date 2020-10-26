const Router = require("@koa/router");
const router = new Router();

const { search,refreshHot } = require('../controllers/HotSearch');

router.get('/api/hotSearch', search);
router.get('/api/hotSearch/refresh', refreshHot);


module.exports = router;
