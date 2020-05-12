const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
   ctx.body = '项目初始化'
});

app.listen(2333);