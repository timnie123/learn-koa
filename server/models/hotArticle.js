class HotArticle {
  async insertExMoo(data, conn, type) {
    const querySql = `select flag from exmoo where type = '${type}' ORDER BY id DESC limit 1;`;
    const [rows] = await conn.execute(querySql);
    let flag = 0;
    if (rows[0]) {
      flag = rows[0].flag
    }
    let insertSql = '';
    let list = data.reverse();
    for (let i = 0; i < list.length; i ++) {
      if (list[i].flag > flag) {
        insertSql = `insert into exmoo (mainTitle, subTitle, type, url, imgUrl, createTime, flag, views, updateTime)
        values (?,?,?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[list[i].mainTitle, list[i].subTitle, list[i].type,
            list[i].url, list[i].imageUrl, list[i].createDate, list[i].flag, list[i].views, list[i].upDateTime]);
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
    let list = data.reverse();
    for (let i = 0; i < list.length; i ++) {
      if (list[i].imageUrl) {
        insertSql = `insert into hk01 (title, type, type_sub, url, img_url, create_time, flag, update_time)
        values (?,?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[list[i].title, list[i].type, list[i].typeSub,
            list[i].url, list[i].imageUrl, list[i].createDate, list[i].flag, list[i].upDateTime]);
          console.log('插入HK成功')
        } catch (e) {
          console.log(e)
        }
        console.log(i)
      }
    }
    return true
  }
  async queryHk(num, conn) {
    const querySql = `select * from hk01 ORDER BY id DESC limit ${num * 20},20;`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async countHk(conn) {
    const querySql = `select count(1) from hk01`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
}
module.exports = new HotArticle();
