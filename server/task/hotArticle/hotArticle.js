const puppeteer = require('puppeteer');
// const { updateHotSearch } = require('../../models/hotSearch');
class HotArticle {
  async exmoo(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.exmoo.com/hot');
    console.log('力报');
    await page.waitFor(2000);
    const searchData = [];
    // 关闭弹窗
    await page.click('#website_ad_type_2 span');
    // 获取数据
    const mainTitle = await page.$$eval('#hot-container .hot-list-item .hot-list-item-main-title',
        lis => lis.map((li)=>li.textContent.trim()));
    const subTitle = await page.$$eval('#hot-container .hot-list-item .hot-list-item-sub-title',
        lis => lis.map(li=>li.textContent.trim()));
    const Url = await page.$$eval('#hot-container .hot-list-item-content .hot-list-item-link',
      lis => lis.map(li=>li.getAttribute('href')));
    const ImageUrl = await page.$$eval('#hot-container .hot-list-item .hot-list-item-img',
      lis => lis.map(li=>li.getAttribute('src')));
    const createDate = await page.$$eval('#hot-container .hot-list-item .hot-list-item-pub-date',
      lis => lis.map(li=>li.textContent));
    await browser.close();
    console.log(mainTitle);
    console.log(subTitle);
    console.log(Url);
    console.log(ImageUrl);
    console.log(createDate);
    const currTime = new Date(new Date().toDateString()).getTime();
    // 组装数据
    /*for (let i = 0; i < createDate.length; i ++) {
      const date = createDate[i].split('/').reverse().join('/');
      const time = new Date(date).getTime();

      if (time === currTime) {
        searchData[i] = {};
        searchData[i].mainTitle = mainTitle[i] || null;
        searchData[i].subTitle = subTitle[i] || null;
        searchData[i].Url = Url[i];
        searchData[i].ImageUrl = ImageUrl[i];
        searchData[i].createDate = createDate[i];
        searchData[i].type = 'exmoo_hot_news';
      }
      console.log(searchData)
    }*/
  }
}
module.exports = new HotArticle();
