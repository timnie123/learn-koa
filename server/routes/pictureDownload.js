const Router = require("@koa/router");
const router = new Router();

const { download } = require('../controllers/pictureDownload');

router.get('/api/pictureDownload', download);


module.exports = router;
