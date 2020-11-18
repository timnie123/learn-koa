const puppeteer = require('puppeteer');
const { updateHotSearch } = require('../../models/hotSearch');
class HotSearch {
    async weiboSearch(conn) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6');
        console.log('微博热搜');

        const searchData = [];
        // 获取热搜数据
        const title = await page.$$eval('.td-02 a', lis => lis.map(li=>li.textContent));
        const url = await page.$$eval('.td-02 a', lis => lis.map(li=>li.getAttribute('href')));
        await browser.close();
        // 组装数据
        for (let i = 0; i < 10; i++) {
            searchData[i] = {};
            searchData[i].title = title[i];
            searchData[i].url = `https://s.weibo.com${url[i]}`;
            searchData[i].ranking = i;
            searchData[i].source = 'weiboSearch';
            searchData[i].time = new Date().getTime();
        }
        updateHotSearch(searchData, conn);
    }
    async weiboNews(conn) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://s.weibo.com/top/summary?cate=socialevent');
        console.log('微博热文');

        const searchData = [];
        // 获取热搜数据
        const title = await page.$$eval('.td-02 a', lis => lis.map(li=>li.textContent));
        const url = await page.$$eval('.td-02 a', lis => lis.map(li=>li.getAttribute('href')));
        await browser.close();
        // 组装数据
        for (let i = 0; i < 10; i++) {
            searchData[i] = {};
            searchData[i].title = title[i];
            searchData[i].url = `https://s.weibo.com${url[i]}`;
            searchData[i].ranking = i;
            searchData[i].source = 'weiboNews';
            searchData[i].time = new Date().getTime();
        }
        updateHotSearch(searchData, conn);
    }
    async weiboTopic(conn) {
        const browser = await puppeteer.launch({headless: true,defaultViewport:{width:1980,height:1200}});
        const page = await browser.newPage();
        const searchData = [];
        await page.goto('https://d.weibo.com/231650');
        console.log('微博热门话题');

        page.on('load', async () => {
            const flag = await page.$$eval('#plc_unlogin_home_main .UG_box_foot .S_txt1', lis => lis.map(li=>li.textContent));
            if (flag.length > 0) {
              await page.click('#plc_unlogin_home_main .UG_box_foot .S_txt1');
              page.on('popup', async() => {
                const target = await browser.waitForTarget(t=>t.url() === 'https://d.weibo.com/231650');
                const newPage = await target.page();
                await newPage.waitFor(2000);
                // 获取热搜数据
                const title = await newPage.$$eval('.pt_li[action-type="widget_jumpurl"] .pic_box img', lis => lis.map(li=>li.getAttribute('alt')));
                const url = await newPage.$$eval('.W_autocut .S_txt1', lis => lis.map(li=>li.getAttribute('href')));
                await browser.close();
                // 组装数据
                for (let i = 0; i < 10; i++) {
                  searchData[i] = {};
                  searchData[i].title = title[i];
                  searchData[i].url = url[i];
                  searchData[i].ranking = i;
                  searchData[i].source = 'weiboTopic';
                  searchData[i].time = new Date().getTime();
                }
                updateHotSearch(searchData, conn);
              })
            } else {
              // 获取热搜数据
              const title = await page.$$eval('.pt_li[action-type="widget_jumpurl"] .pic_box img', lis => lis.map(li=>li.getAttribute('alt')));
              const url = await page.$$eval('.W_autocut .S_txt1', lis => lis.map(li=>li.getAttribute('href')));
              await browser.close();
              // 组装数据
              for (let i = 0; i < 10; i++) {
                searchData[i] = {};
                searchData[i].title = title[i];
                searchData[i].url = url[i];
                searchData[i].ranking = i;
                searchData[i].source = 'weiboTopic';
                searchData[i].time = new Date().getTime();
              }
              updateHotSearch(searchData, conn);
            }
        });
    }
    async toutiaoSearch(conn) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://i.snssdk.com/feoffline/hot_list/template/hot_list/?client_extra_params=%7B%22custom_log_pb%22%3A%22%7B%5C%22cluster_type%5C%22%3A%5C%220%5C%22%2C%5C%22entrance_hotspot%5C%22%3A%5C%22search%5C%22%2C%5C%22hide_hot_board_card%5C%22%3A%5C%221%5C%22%2C%5C%22hot_board_cluster_id%5C%22%3A%5C%226885667877471388174%5C%22%2C%5C%22location%5C%22%3A%5C%22hot_board%5C%22%2C%5C%22rank%5C%22%3A%5C%2250%5C%22%2C%5C%22source%5C%22%3A%5C%22trending_tab%5C%22%2C%5C%22style_id%5C%22%3A%5C%2240128%5C%22%7D%22%7D&count=50&log_pb=%7B%22cluster_type%22%3A%220%22%2C%22entrance_hotspot%22%3A%22search%22%2C%22hide_hot_board_card%22%3A%221%22%2C%22hot_board_cluster_id%22%3A%226885667877471388174%22%2C%22location%22%3A%22hot_board%22%2C%22rank%22%3A%2250%22%2C%22source%22%3A%22trending_tab%22%2C%22style_id%22%3A%2240128%22%7D&tab_name=stream');
        console.log('头条热搜');
        await page.waitFor(1000);
        const searchData = [];
        // 获取热搜数据
        const title = await page.$$eval('.hot-list-v2 .card-title', lis => lis.map(li=>li.textContent));
        await browser.close();
        // 组装数据
        for (let i = 0; i < 10; i++) {
            searchData[i] = {};
            searchData[i].title = title[i];
            searchData[i].url = `https://so.toutiao.com/`;
            searchData[i].ranking = i;
            searchData[i].source = 'toutiaoSearch';
            searchData[i].time = new Date().getTime();
        }
        updateHotSearch(searchData, conn);
    }
    async baiduSearch(conn) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('http://top.baidu.com/');
        console.log('百度热搜');
        await page.waitFor(1000);
        const searchData = [];
        // 获取热搜数据
        const title = await page.$$eval('#main #hot-list .list-title', lis => lis.map(li=>li.getAttribute('title')));
        const url = await page.$$eval('#main #hot-list .list-title', lis => lis.map(li=>li.getAttribute('href')));
        await browser.close();
        // 组装数据
        for (let i = 0; i < 10; i++) {
            searchData[i] = {};
            searchData[i].title = title[i];
            searchData[i].url = url[i];
            searchData[i].ranking = i;
            searchData[i].source = 'baidu';
            searchData[i].time = new Date().getTime();
        }
        updateHotSearch(searchData, conn);
    }
    async doubanTopic(conn) {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://www.douban.com/gallery/');
        console.log('豆瓣话题');
        await page.waitFor(1000);
        const searchData = [];
        // 获取热搜数据
        const title = await page.$$eval('#content .trend a', lis => lis.map(li=>li.textContent));
        const url = await page.$$eval('#content .trend a', lis => lis.map(li=>li.getAttribute('href')));
        await browser.close();
        // 组装数据
        for (let i = 0; i < 10; i++) {
            searchData[i] = {};
            searchData[i].title = title[i];
            searchData[i].url = url[i];
            searchData[i].ranking = i;
            searchData[i].source = 'doubanTopic';
            searchData[i].time = new Date().getTime();
        }
        updateHotSearch(searchData, conn);
    }
}
module.exports = new HotSearch();
