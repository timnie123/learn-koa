const Koa = require('koa');
const app = new Koa();
const routing = require('./routes');

routing(app);

app.listen(2333);
console.log('server is start');
