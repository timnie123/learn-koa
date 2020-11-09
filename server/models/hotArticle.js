class HotArticle {
  async insertExMoo(data, conn, type) {
    const querySql = `select flag from exmoo where type = '${type}' ORDER BY id DESC limit 1;`;
    const [rows] = await conn.execute(querySql);
    console.log(rows[0].flag);
    let insertSql = '';
    for (let i = 0; i < data.length; i ++) {
      if (data[i].flag > rows[0].flag) {
        insertSql = `insert into exmoo (mainTitle, subTitle, type, url, imgUrl, createTime, flag)
        values (?,?,?,?,?,?,?);`;
        const [rows] = await conn.execute(insertSql,[data[i].mainTitle, data[i].subTitle, data[i].type,
          data[i].url, data[i].imageUrl, data[i].createDate, data[i].flag]);
      }
    }
  }
}
module.exports = new HotArticle();
