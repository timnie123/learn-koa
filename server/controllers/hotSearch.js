const { searchList } = require('../models/hotSearch');
const { refresh } = require('../task/hotSearch/index');
class HotSearch {
    async search(ctx) {
        const data = await searchList(ctx);
        ctx.body = {
            code: 200,
            data
        };
    }
    async refreshHot(ctx) {
        const data = await refresh(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: data
        };
    }
}

module.exports = new HotSearch();
