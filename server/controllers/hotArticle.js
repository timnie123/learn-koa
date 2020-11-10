const { queryExMoo, countExMoo } = require('../models/hotArticle');
class HotArticle {
  async search(ctx) {
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
}

module.exports = new HotArticle();
