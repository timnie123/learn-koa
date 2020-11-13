const { queryExMoo, countExMoo, queryHk, countHk } = require('../models/hotArticle');
const { refreshHkTec, refreshHkLife, refreshExmooLife, refreshExmooNews } = require('../task/hotArticle/index');
class HotArticle {
  async searchExmoo(ctx) {
    const page = ctx.query.currentPage || 1;
    const data = await queryExMoo(page, ctx.app.context.db);
    const num = await countExMoo(ctx.app.context.db);
    ctx.body = {
      code: 200,
      data: {
        pager:{
          total: num[0]['count(1)']
        },
        info: data
      }
    };
  }
  async searchHk01(ctx) {
    const page = ctx.query.currentPage || 1;
    const data = await queryHk(page, ctx.app.context.db);
    const num = await countHk(ctx.app.context.db);
    ctx.body = {
      code: 200,
      data: {
        pager:{
          total: num[0]['count(1)']
        },
        info: data
      }
    };
  }
  async refreshExmooLife(ctx) {
    console.log('refresh exmooLife router');
    const data = await refreshExmooLife(ctx.app.context.db);
    ctx.body = {
      code: 200,
      data: {
        message: 'REFRESH SUCCESS'
      }
    };
    console.log('refreshExmoo ' + data);
  }
  async refreshExmooNews(ctx) {
    const data = await refreshExmooNews(ctx.app.context.db);
    console.log('refresh exmooNews router');
    ctx.body = {
      code: 200,
      data: {
        message: 'REFRESH SUCCESS'
      }
    };
    console.log('refreshExmoo ' + data);
  }
  async refreshHkTec(ctx) {
    console.log('refresh hkTec router');
    const data = await refreshHkTec(ctx.app.context.db);
    console.log('refreshHk01 ' + data);
    ctx.body = {
      code: 200,
      data: {
        message: 'REFRESH SUCCESS'
      }
    };
  }
  async refreshHkLife(ctx) {
    console.log('refresh hkLife router');
    const data = await refreshHkLife(ctx.app.context.db);
    console.log('refreshHk01 ' + data);
    ctx.body = {
      code: 200,
      data: {
        message: 'REFRESH SUCCESS'
      }
    };
  }
}

module.exports = new HotArticle();
