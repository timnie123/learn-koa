const {
    weiboSearch,
    toutiaoSearch,
    weiboTopic,
    weiboNews
} = require('./hotSearch');
class Task {
    async refresh(conn) {
        await weiboSearch(conn);
        await toutiaoSearch(conn);
        await weiboTopic(conn);
        await weiboNews(conn);
        return true
    }
}
module.exports = new Task();
