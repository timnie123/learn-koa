const Router = require("@koa/router");
const router = new Router();

const {
  searchExmoo,
  searchHk01,
  refreshExmooLife,
  refreshExmooNews,
  refreshHkTec,
  refreshHkLife,
  searchFb,
  refreshFBTripAddict,
  refreshFBUMagazineHK
} = require('../controllers/HotArticle');

router.get('/api/hotArticle/exmoo/news', searchExmoo);
router.get('/api/hotArticle/exmoo/refreshNews', refreshExmooNews);
router.get('/api/hotArticle/exmoo/refreshLife', refreshExmooLife);
router.get('/api/hotArticle/hk01/news', searchHk01);
router.get('/api/hotArticle/hk01/refreshTec', refreshHkTec);
router.get('/api/hotArticle/hk01/refreshLife', refreshHkLife);
router.get('/api/hotArticle/fb/post', searchFb);
router.get('/api/hotArticle/fb/refreshTripAddict', refreshFBTripAddict);
router.get('/api/hotArticle/fb/refreshUMagazineHK', refreshFBUMagazineHK);


module.exports = router;
