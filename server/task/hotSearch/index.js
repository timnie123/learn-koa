const {
    weiboSearch,
    toutiaoSearch,
    weiboTopic,
    weiboNews,
    baiduSearch,
    doubanTopic
} = require('./hotSearch');
class Task {
    async refreshWeibo(conn) {
        await weiboSearch(conn);
        return true
    }
    async refreshToutiao(conn) {
        await toutiaoSearch(conn);
        return true
    }
    async refreshWeiboTopic(conn) {
        await weiboTopic(conn);
        return true
    }
    async refreshWeiboNews(conn) {
        await weiboNews(conn);
        return true
    }
    async refreshBaidu(conn) {
        await baiduSearch(conn);
        return true
    }
    async refreshdoubanTopic(conn) {
        await doubanTopic(conn);
        return true
    }
}
module.exports = new Task();
