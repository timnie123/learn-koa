const puppeteer = require('puppeteer');
const { insertExMoo, insertHk } = require('../../models/hotArticle');
class HotArticle {
  async exmoo(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.exmoo.com/hot');
    console.log('力报');
    await page.waitForTimeout(2000);
    for (let i = 0; i < 50; i++) {
      await page.waitForTimeout(500);
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
        const eleViews = hotList[i].querySelector('.hot-list-item-viewed');
        let mainTitle = '';
        let subTitle = '';
        let url = '';
        let imageUrl = '';
        let createDate = '';
        let views = '';
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
        if (eleViews) {
          views = eleViews.textContent
        }

        obj['mainTitle'] = mainTitle || '無標題';
        obj['subTitle'] = subTitle || '無標題';
        obj['url'] = url;
        obj['type'] = 'news';
        obj['imageUrl'] = imageUrl;
        obj['createDate'] = new Date(createDate.split('/').reverse().join('/')).getTime();
        obj['flag'] = Number(url.substring(url.indexOf('article/') + 8, url.indexOf('.html')));
        obj['views'] = views;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    insertExMoo(list, coon, 'news')
  }
  async exmooLife(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.exmoo.com/supplement');
    console.log('力报生活');
    await page.waitForTimeout(2000);
    for (let i = 0; i < 50; i++) {
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
    }
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('#supplement-all-container .supplement-span-col');
      let arr = [];
      for (let i = 0; i < hotList.length; i++) {
        let obj = {};
        const eleMainTitle = hotList[i].querySelector('.supplement-01-title');
        const eleSubTitle = hotList[i].querySelector('.supplement-01-sub-title');
        const eleUrl = hotList[i].querySelector('a[rel="nofollow"]');
        const eleImageUrl = hotList[i].querySelector('.two-column-img');
        const eleCreateDate = hotList[i].querySelector('.supplement-item-date');
        const eleViews = hotList[i].querySelector('.supplement-item-viewed');
        let mainTitle = '';
        let subTitle = '';
        let url = '';
        let imageUrl = '';
        let createDate = '';
        let views = '';
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
        if (eleViews) {
          views = eleViews.textContent
        }

        obj['mainTitle'] = mainTitle || '無標題';
        obj['subTitle'] = subTitle || '無標題';
        obj['url'] = url;
        obj['type'] = 'life';
        obj['imageUrl'] = imageUrl;
        obj['createDate'] = new Date(createDate.split('/').reverse().join('/')).getTime();
        obj['flag'] = Number(url.substring(url.indexOf('article/') + 8, url.indexOf('.html')));
        obj['views'] = views;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    insertExMoo(list, coon, 'life')
  }
  async hkTechnology(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.hk01.com/zone/11/%E7%A7%91%E6%8A%80%E7%8E%A9%E7%89%A9');
    console.log('hk_01 科技玩物');
    await page.waitForTimeout(2000);
    for (let i = 0; i < 120; i++) {
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
    }
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('.infinite-scroll-item');
      let arr = [];
      for (let i = 0; i < hotList.length; i++) {
        let obj = {};
        const eleTitle = hotList[i].querySelector('.fbyKmi a div');
        const eleUrl = hotList[i].querySelector('.fbyKmi a');
        const eleImageUrl = hotList[i].querySelector('.iSRWhq');
        const eleCreateDate = hotList[i].querySelector('.jOEDxb');
        const eleTypeSub = hotList[i].querySelector('.elcsaQ a');
        let title = '';
        let url = '';
        let imageUrl = '';
        let createDate = '';
        let typeSub = '';
        if (eleTitle) {
          title = eleTitle.textContent.trim()
        }
        if (eleUrl) {
          url = eleUrl.getAttribute('href')
        }
        if (eleImageUrl) {
          imageUrl = eleImageUrl.getAttribute('src')
        }
        if (eleCreateDate) {
          if (isNaN(new Date(eleCreateDate.textContent).getTime())) {
            createDate = new Date().getTime();
          } else {
            createDate = new Date(eleCreateDate.textContent).getTime();
          }
        }
        if (eleTypeSub) {
          typeSub = eleTypeSub.textContent
        }

        obj['title'] = title;
        obj['url'] = url;
        obj['type'] = 'tec';
        obj['imageUrl'] = imageUrl;
        obj['createDate'] = createDate;
        obj['flag'] = 1;
        obj['typeSub'] = typeSub;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    // console.log(list)
    await insertHk(list, coon)
  }
  async hkLife(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.goto('https://www.hk01.com/zone/19/%E5%A5%BD%E9%A3%9F%E7%8E%A9%E9%A3%9B');
    console.log('hk_01 好食玩飛');
    await page.waitForTimeout(2000);
    for (let i = 0; i < 120; i++) {
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
    }
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('.infinite-scroll-item');
      let arr = [];
      for (let i = 0; i < hotList.length; i++) {
        let obj = {};
        const eleTitle = hotList[i].querySelector('.fbyKmi a div');
        const eleUrl = hotList[i].querySelector('.fbyKmi a');
        const eleImageUrl = hotList[i].querySelector('.iSRWhq');
        const eleCreateDate = hotList[i].querySelector('.jOEDxb');
        const eleTypeSub = hotList[i].querySelector('.elcsaQ a');
        let title = '';
        let url = '';
        let imageUrl = '';
        let createDate = '';
        let typeSub = '';
        if (eleTitle) {
          title = eleTitle.textContent.trim()
        }
        if (eleUrl) {
          url = eleUrl.getAttribute('href')
        }
        if (eleImageUrl) {
          imageUrl = eleImageUrl.getAttribute('src')
        }
        if (eleCreateDate) {
          if (isNaN(new Date(eleCreateDate.textContent).getTime())) {
            createDate = new Date().getTime();
          } else {
            createDate = new Date(eleCreateDate.textContent).getTime();
          }
        }
        if (eleTypeSub) {
          typeSub = eleTypeSub.textContent
        }

        obj['title'] = title;
        obj['url'] = url;
        obj['type'] = 'life';
        obj['imageUrl'] = imageUrl;
        obj['createDate'] = createDate;
        obj['flag'] = 1;
        obj['typeSub'] = typeSub;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    // console.log(list)
    await insertHk(list, coon)
  }
}
module.exports = new HotArticle();
