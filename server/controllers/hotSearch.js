const { searchList } = require('../models/hotSearch');
const {
    refreshWeibo,
    refreshToutiao,
    refreshWeiboTopic,
    refreshWeiboNews,
    refreshBaidu,
    refreshdoubanTopic
} = require('../task/hotSearch/index');
class HotSearch {
    async search(ctx) {
        const data = await searchList(ctx);
        ctx.body = {
            code: 200,
            data
        };
    }
    async refreshWeibo(ctx) {
        await refreshWeibo(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
    async refreshToutiao(ctx) {
        await refreshToutiao(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
    async refreshWeiboTopic(ctx) {
        await refreshWeiboTopic(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
    async refreshWeiboNews(ctx) {
        await refreshWeiboNews(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
    async refreshBaidu(ctx) {
        await refreshBaidu(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
    async refreshdoubanTopic(ctx) {
        await refreshdoubanTopic(ctx.app.context.db);
        console.log('refreshHot down');
        ctx.body = {
            code: 200,
            data: {
                message: 'REFRESH SUCCESS'
            }
        };
    }
}

module.exports = new HotSearch();
