class HotArticle {
  async insertExMoo(data, conn, type) {
    const querySql = `select flag from exmoo where type = '${type}' ORDER BY id DESC limit 1;`;
    const [rows] = await conn.execute(querySql);
    let flag = 0;
    if (rows[0]) {
      flag = rows[0].flag
    }
    let insertSql = '';
    for (let i = 0; i < data.length; i ++) {
      if (data[i].flag > flag) {
        insertSql = `insert into exmoo (mainTitle, subTitle, type, url, imgUrl, createTime, flag, views)
        values (?,?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[data[i].mainTitle, data[i].subTitle, data[i].type,
            data[i].url, data[i].imageUrl, data[i].createDate, data[i].flag, data[i].views]);
            console.log('插入exmoo成功')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
  async queryExMoo(num, conn) {
    const querySql = `select * from exmoo ORDER BY id DESC limit ${num * 20},20;`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async countExMoo(conn) {
    const querySql = `select count(1) from exmoo`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async insertHk(data, conn) {
    let insertSql = '';
    for (let i = 0; i < data.length; i ++) {
      if (data[i].imageUrl) {
        insertSql = `insert into hk01 (title, type, type_sub, url, img_url, create_time, flag)
        values (?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[data[i].title, data[i].type, data[i].typeSub,
            data[i].url, data[i].imageUrl, data[i].createDate, data[i].flag]);
          console.log('插入HK成功')
        } catch (e) {
          console.log(e)
        }
        console.log(i)
      }
    }
  }
}
module.exports = new HotArticle();
