const puppeteer = require('puppeteer');
const { insertExMoo } = require('../../models/hotArticle');
class HotArticle {
  async exmoo(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.exmoo.com/hot');
    console.log('力报');
    await page.waitFor(2000);
    for (let i = 0; i < 30; i++) {
      await page.waitFor(200);
      await page.keyboard.press('ArrowDown');
    }
    // 关闭弹窗
    await page.click('#website_ad_type_2 span');
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('#hot-container .hot-list-item');
      let arr = [];
      for (let i = 0; i < hotList.length; i++) {
        let obj = {};
        const eleMainTitle = hotList[i].querySelector('.hot-list-item-main-title');
        const eleSubTitle = hotList[i].querySelector('.hot-list-item-sub-title');
        const eleUrl = hotList[i].querySelector('.hot-list-item-link');
        const eleImageUrl = hotList[i].querySelector('.hot-list-item-img');
        const eleCreateDate = hotList[i].querySelector('.hot-list-item-pub-date');
        let mainTitle = '';
        let subTitle = '';
        let url = '';
        let imageUrl = '';
        let createDate = '';
        if (eleMainTitle) {
          mainTitle = eleMainTitle.textContent.trim()
        }
        if (eleSubTitle) {
          subTitle = eleSubTitle.textContent.trim()
        }
        if (eleUrl) {
          url = eleUrl.getAttribute('href')
        }
        if (eleImageUrl) {
          imageUrl = eleImageUrl.getAttribute('src')
        }
        if (eleCreateDate) {
          createDate = eleCreateDate.textContent
        }

        obj['mainTitle'] = mainTitle;
        obj['subTitle'] = subTitle;
        obj['url'] = url;
        obj['type'] = 'news';
        obj['imageUrl'] = imageUrl;
        obj['createDate'] = new Date(createDate.split('/').reverse().join('/')).getTime();
        obj['flag'] = Number(url.substring(url.indexOf('article/') + 8, url.indexOf('.html')));
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    insertExMoo(list, coon, 'news')
  }
}
module.exports = new HotArticle();
