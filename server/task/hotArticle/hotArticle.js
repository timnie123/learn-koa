const puppeteer = require('puppeteer');
const { insertExMoo, insertHk, insertFaceBook } = require('../../models/hotArticle');
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
  async facebookTheTripAddict(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.facebook.com/pg/thetripaddict/posts/?ref=page_internal');
    console.log('facebook 旅癮我最大');
    await page.waitForTimeout(2000);
    const errorFlag = await page.$$eval('.uiOverlayFooter a[action="cancel"]', lis => lis.map(li=>li.textContent));
    // 關閉錯誤彈窗
    if (errorFlag.length > 0) {
      try {
        await page.click('.uiOverlayFooter a[action="cancel"]');
      } catch (e) {
        console.log(e)
      }
    }
    for (let i = 0; i < 150; i++) {
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
    }
    if (errorFlag.length > 0) {
      try {
        await page.click('.uiOverlayFooter a[action="cancel"]');
      } catch (e) {
        console.log(e)
      }
    }
    await page.waitForTimeout(1000);
    const loginFlag = await page.$$eval('#expanding_cta_close_button', lis => lis.map(li=>li.textContent));
    // 關閉登錄彈窗
    if (loginFlag.length > 0) {
      try {
        await page.click('#expanding_cta_close_button');
      } catch (e) {
        console.log(e)
      }
    }
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('#pagelet_timeline_main_column .userContentWrapper');
      let arr = [];
      for (let i = 0; i < 10; i++) {
        let obj = {};
        const eleTitle = hotList[i].querySelector('div[data-testid="post_message"] .text_exposed_root p:first-child');
        const eleUrl = hotList[i].querySelector('.commentable_item input[name="ft_ent_identifier"]');
        const eleImageUrl = hotList[i].querySelector('.scaledImageFitWidth');
        const eleVideoCoverUrl = hotList[i].querySelector('._3chq');
        const eleCreateDate = hotList[i].querySelector('.timestampContent');
        const eleLikeNum = hotList[i].querySelector('.commentable_item ._81hb');
        const eleCommentNum = hotList[i].querySelector('.commentable_item ._4vn1 span:first-child a');
        const eleShareNum = hotList[i].querySelector('.commentable_item ._4vn1 span:last-child a');
        let title = '';
        let url = '';
        let imageUrl = '';
        let videoCoverUrl = '';
        let createDate = '';
        let likeNum = '';
        let commentNum = '';
        let shareNum = '';
        if (eleTitle) {
          title = eleTitle.textContent.trim()
        }
        if (eleUrl) {
          url =`/thetripaddict/posts/${eleUrl.getAttribute('value')}`
        }
        if (eleImageUrl) {
          imageUrl = eleImageUrl.getAttribute('src')
        }
        if (eleVideoCoverUrl) {
          videoCoverUrl = eleVideoCoverUrl.getAttribute('src')
        }
        if (eleLikeNum) {
          likeNum = eleLikeNum.textContent
        }
        if (eleCommentNum) {
          commentNum = eleCommentNum.textContent
        }
        if (eleShareNum) {
          shareNum = eleShareNum.textContent
        }
        if (eleCreateDate) {
          let date = eleCreateDate.textContent;
          date = date.replace('月', '/');
          date = date.replace('日', '/' + new Date().getFullYear());
          if (isNaN(new Date(date).getTime())) {
            createDate = new Date().getTime();
          } else {
            createDate = new Date(date).getTime();
          }
        }

        obj['title'] = title;
        obj['url'] = url;
        obj['type'] = 'post';
        obj['user'] = '旅癮我最大';
        obj['likeNum'] = likeNum;
        obj['commentNum'] = commentNum;
        obj['shareNum'] = shareNum;
        obj['imageUrl'] = imageUrl || videoCoverUrl;
        obj['createDate'] = createDate;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    // console.log(list)
    await insertFaceBook(list, coon)
  }
  async facebookUMagazineHK(coon) {
    const browser = await puppeteer.launch({headless: true, defaultViewport:{width:1980,height:1200}});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.facebook.com/pg/umagazinehk/posts/?ref=page_internal');
    console.log('facebook U Magazine');
    await page.waitForTimeout(2000);
    const errorFlag = await page.$$eval('.uiOverlayFooter a[action="cancel"]', lis => lis.map(li=>li.textContent));
    // 關閉錯誤彈窗
    if (errorFlag.length > 0) {
      try {
        await page.click('.uiOverlayFooter a[action="cancel"]');
      } catch (e) {
        console.log(e)
      }
    }
    for (let i = 0; i < 150; i++) {
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
    }
    if (errorFlag.length > 0) {
      try {
        await page.click('.uiOverlayFooter a[action="cancel"]');
      } catch (e) {
        console.log(e)
      }
    }
    await page.waitForTimeout(1000);
    const loginFlag = await page.$$eval('#expanding_cta_close_button', lis => lis.map(li=>li.textContent));
    // 關閉登錄彈窗
    if (loginFlag.length > 0) {
      try {
        await page.click('#expanding_cta_close_button');
      } catch (e) {
        console.log(e)
      }
    }
    // 获取数据
    const list = await page.evaluate(() => {
      const hotList = document.querySelectorAll('#pagelet_timeline_main_column .userContentWrapper');
      let arr = [];
      for (let i = 0; i < 10; i++) {
        let obj = {};
        const eleTitle = hotList[i].querySelector('div[data-testid="post_message"] .text_exposed_root p:first-child');
        const eleUrl = hotList[i].querySelector('.commentable_item input[name="ft_ent_identifier"]');
        const eleImageUrl = hotList[i].querySelector('.scaledImageFitWidth');
        const eleVideoCoverUrl = hotList[i].querySelector('._3chq');
        const eleCreateDate = hotList[i].querySelector('.timestampContent');
        const eleLikeNum = hotList[i].querySelector('.commentable_item ._81hb');
        const eleCommentNum = hotList[i].querySelector('.commentable_item ._4vn1 span:first-child a');
        const eleShareNum = hotList[i].querySelector('.commentable_item ._4vn1 span:last-child a');
        let title = '';
        let url = '';
        let imageUrl = '';
        let videoCoverUrl = '';
        let createDate = '';
        let likeNum = '';
        let commentNum = '';
        let shareNum = '';
        if (eleTitle) {
          title = eleTitle.textContent.trim()
        }
        if (eleUrl) {
          url =`/umagazinehk/posts/${eleUrl.getAttribute('value')}`
        }
        if (eleImageUrl) {
          imageUrl = eleImageUrl.getAttribute('src')
        }
        if (eleVideoCoverUrl) {
          videoCoverUrl = eleVideoCoverUrl.getAttribute('src')
        }
        if (eleLikeNum) {
          likeNum = eleLikeNum.textContent
        }
        if (eleCommentNum) {
          commentNum = eleCommentNum.textContent
        }
        if (eleShareNum) {
          shareNum = eleShareNum.textContent
        }
        if (eleCreateDate) {
          let date = eleCreateDate.textContent;
          date = date.replace('月', '/');
          date = date.replace('日', '/' + new Date().getFullYear());
          if (isNaN(new Date(date).getTime())) {
            createDate = new Date().getTime();
          } else {
            createDate = new Date(date).getTime();
          }
        }

        obj['title'] = title;
        obj['url'] = url;
        obj['type'] = 'post';
        obj['user'] = 'U Magazine';
        obj['likeNum'] = likeNum;
        obj['commentNum'] = commentNum;
        obj['shareNum'] = shareNum;
        obj['imageUrl'] = imageUrl || videoCoverUrl;
        obj['createDate'] = createDate;
        obj['upDateTime'] = new Date().getTime();
        arr.push(obj);
      }
      return arr
    });
    await browser.close();
    // console.log(list)
    await insertFaceBook(list, coon)
  }
}
module.exports = new HotArticle();
