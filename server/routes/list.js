const Router = require("@koa/router");
const router = new Router();

const { show } = require('../controllers/list');

router.get('/list/:id', show);


module.exports = router;