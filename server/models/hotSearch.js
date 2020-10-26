class HotSearch {
    async searchList(ctx) {
        const sql1 = 'select * from hot_search';
        const conn = ctx.app.context.db;
        const [rows] = await conn.execute(sql1);
        return rows
    }
    async updateHotSearch(data, conn) {
        let sql = '';
        for (let i = 0; i < data.length; i++) {
            sql = `update hot_search set title = '${data[i].title}', url='${data[i].url}',updateTime = '${data[i].time}' where source='${data[i].source}' and ranking = ${data[i].ranking};`
            const [rows] = await conn.execute(sql);
        }
        return true
    }
}

module.exports = new HotSearch();
