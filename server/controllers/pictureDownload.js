class PictureDownload {
    download(ctx) {
        const query = ctx.query;
        if (query.type && query.value && query.count) {
            ctx.type = 'application/json';
            ctx.status = 200;
            ctx.body = {
                type: ctx.query.type,
                value: ctx.query.value,
                count: ctx.query.count
            };
        } else {
            ctx.type = 'application/json';
            ctx.status = 400;
            ctx.body = {
                error: '参数错误'
            };
        }
    }
}

module.exports = new PictureDownload();
