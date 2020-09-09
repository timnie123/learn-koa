const puppeteer = require('puppeteer');
const src2Img = require('./utils/srcToimg');
const send = require('koa-send');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const imgPath = path.resolve(__dirname, './public/img/');
const iPhone = puppeteer.devices['iPhone 6'];
// const io = require('socket.io')(8085);

(async() =>{
    const tplImgPath = `${imgPath}\\JD`;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.emulate(iPhone);
    // page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');
    await page.waitFor(5000);
    await page.goto('https://market.m.taobao.com/app/tbsearchwireless-pages/new-catemap/p/s-nx-categories?spm=a215s.7406091.0.0&utparam=%7B%22ranger_buckets_native%22%3A%22tsp2584_31920%22%7D&scm=1007.home_icon.fenl.d&wh_weex=true');

    console.log('go to search');
    const nav = await page.$$eval('#category2 li', lis => lis.map(li=>li.id));
    const navText = await page.$$eval('#category2 li', lis => lis.map(li=>li.textContent))
    await page.waitFor(2000);
    for (let i = 1; i < 3; i++) {
        console.log(i)
        await page.click(`#${nav[i]}`)
        await page.waitFor(2000)
        /*await page.mouse.move(300, 160);
        await page.mouse.down();
        await page.mouse.move(300, 660);*/
        /*setTimeout(async function () {
            const srcs = await page.evaluate(() => {
                const images = document.querySelectorAll('.jd-category-div .J_ping img');
                return Array.prototype.map.call(images, img => img.src);
            });
            console.log(srcs.length)
            const textList = await page.$$eval('.jd-category-div .J_ping span', lis => lis.map(li=>li.textContent))
            fs.mkdirSync(tplImgPath + `\\${navText[i]}`);
            for (let n = 0; n < srcs.length; n++) {
                setTimeout(async function() {
                    await src2Img(srcs[n], `${tplImgPath}\\${navText[i]}`, textList[n]);
                }, 5000)
            }
        }, 3000)*/
    }
})()
