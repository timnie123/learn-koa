const Router = require("@koa/router");
const router = new Router();

const {
    search,
    refreshWeibo,
    refreshToutiao,
    refreshWeiboTopic,
    refreshWeiboNews,
    refreshBaidu,
    refreshdoubanTopic
} = require('../controllers/HotSearch');

router.get('/api/hotSearch', search);
router.get('/api/hotSearch/refreshWeibo', refreshWeibo);
router.get('/api/hotSearch/refreshToutiao', refreshToutiao);
router.get('/api/hotSearch/refreshWeiboTopic', refreshWeiboTopic);
router.get('/api/hotSearch/refreshWeiboNews', refreshWeiboNews);
router.get('/api/hotSearch/refreshBaidu', refreshBaidu);
router.get('/api/hotSearch/refreshdoubanTopic', refreshdoubanTopic);


module.exports = router;
