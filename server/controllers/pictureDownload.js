const puppeteer = require('puppeteer');
const src2Img = require('../utils/srcToimg');
const send = require('koa-send');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const imgPath = path.resolve(__dirname, '../public/img/');
class PictureDownload {
    async download(ctx) {
        const query = ctx.query;
        if (query.type && query.value && query.count) {
            const params = {
                value: query.value,
                count: query.count
            };
            switch (query.type) {
                case 'baidu':
                    PictureDownload._downloadByBaiDu(params, ctx);
                    break;
            }
        } else {
            ctx.body = {
                code: 400,
                data: {
                    error: '参数错误'
                }
            };
        }
    }

   static async _downloadByBaiDu(params, ctx) {
       ctx.body = {
           code: 200,
           data: {
               error: '参数错误'
           }
       };
       /*const tplImgPath = `${imgPath}\\${params.value}_${new Date().getTime()}`;
       ctx.body = {
           code: 200,
           data: {
               status: 'loading',
               path: `${tplImgPath}.zip`
           }
       };
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://image.baidu.com/');
        console.log('go to https://image.baidu.com/');

       await page.setViewport({
           width:1920,
           height:1080
       });

        await page.focus('#kw');
        await page.keyboard.sendCharacter(params.value);
        await page.click('.s_search');

        console.log('go to search');

        page.on('load', async () => {
            console.log('page loading down');
            await page.waitFor(1000);
            await page.mouse.move(300, 160);
            await page.mouse.down();
            const num = Number.parseInt(params.count/20);
            for (let i = 0; i < num; i++) {
                await page.waitFor(200);
                await page.keyboard.press('ArrowDown');
            }
                const srcs = await page.evaluate(() => {
                    const images = document.querySelectorAll('img.main_img');
                    return Array.prototype.map.call(images, img => img.src);
                });
                // 创建对应的下载目录
                fs.mkdirSync(tplImgPath);
                for (let i = 0; i < srcs.length; i++) {
                    await src2Img(srcs[i], tplImgPath);
                }
                console.log(srcs.length);
                /!*srcs.forEach(async src =>{
                   await src2Img(src, tplImgPath);
                });*!/
                await browser.close();
            setTimeout(async ()=> {
                    // 打包压缩下载的文件
                    const zipStream = await fs.createWriteStream(`${tplImgPath}.zip`);
                    const zip = archiver('zip');
                    zip.pipe(zipStream);
                    zip.directory(`${tplImgPath}/`, false);
                    zip.finalize();
                }, srcs.length * 15);
                /!*ctx.attachment(`${tplImgPath}.zip`);
                ctx.type = 'application/octet-stream';
                await send(ctx, `${tplImgPath}.zip`)*!/
        });*/
    }
}

module.exports = new PictureDownload();
