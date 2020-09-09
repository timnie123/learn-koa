const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const  {promisify} = require('util');
const writeFile = promisify(fs.writeFile);

module.exports = async (src, dir, fileName) => {
  if (/\.(jpg|png|gif)$/.test(src)) {
    await url2Img(src, dir, fileName);
  } else {
      await base64ToImg(src, dir);
  }
};

const url2Img = promisify((url, dir, fileName, callBack) =>{
  const mod = /^https:/.test(url) ? https : http;
  const ext = path.extname(url);
  let file = '';
  if (fileName) {
      fileName = fileName.replace('/','&')
      file = path.join(dir, `${fileName}${ext}`)
  } else {
      file = path.join(dir, `${Date.now()}${ext}`)
  }

  mod.get(url, res =>{
      const ws = fs.createWriteStream(file);
      res.pipe(ws).on('finish', () =>{
          callBack();
          ws.end();
      })
  })
});

const base64ToImg = async function (base64Str, dir, fileName) {
  const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);

  try{
      const ext = matches[1].split('/')[1].replace('jpeg', 'jpg');
      let file = '';
      if (fileName) {
          fileName = fileName.replace('/','&')
          file = path.join(dir, `${fileName}${ext}`)
      } else {
          file = path.join(dir, `${Date.now()}${ext}`)
      }
      await writeFile(file, matches[2], 'base64');
  } catch (e) {
      console.log('err')
  }
};
