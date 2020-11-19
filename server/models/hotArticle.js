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
  async insertFaceBook(data, conn) {
    let insertSql = '';
    let list = data.reverse();
    let currentDate = new Date(new Date().toLocaleDateString() + ' 00:00:00').getTime();
    for (let i = 0; i < list.length; i ++) {
      if (list[i].createDate < currentDate) {
        continue
      }
      if (list[i].imageUrl) {
        insertSql = `insert into facebook_post (title, type, like_num, comment_num, share_num,
         create_time, update_time, url, image_url, user)
        values (?,?,?,?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[list[i].title, list[i].type, list[i].likeNum, list[i].commentNum,
            list[i].shareNum, list[i].createDate, list[i].upDateTime, list[i].url, list[i].imageUrl, list[i].user]);
          console.log('插入FB成功')
        } catch (e) {
          console.log(e)
        }
        console.log(i)
      }
    }
    return true
  }
  async queryFB(num, conn) {
    const querySql = `select * from facebook_post ORDER BY id DESC limit ${num * 20},20;`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async countFB(conn) {
    const querySql = `select count(1) from facebook_post`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async insertCTM(data, conn) {
    let insertSql = '';
    let list = data.reverse();
    for (let i = 0; i < list.length; i ++) {
      if (list[i].imageUrl) {
        insertSql = `insert into ctm (title, carver, location, url, update_time,
         create_time, type, flag, activity_date)
        values (?,?,?,?,?,?,?,?,?);`;
        try {
          const [rows] = await conn.execute(insertSql,[list[i].title, list[i].imageUrl, list[i].location, list[i].url,
            list[i].upDateTime, list[i].createDate, list[i].type, list[i].flag, list[i].activityDate]);
          console.log('插入CTM成功')
        } catch (e) {
          console.log(e)
        }
        console.log(i)
      }
    }
    return true
  }
  async queryCTM(num, conn) {
    const querySql = `select * from ctm ORDER BY id DESC limit ${num * 20},20;`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
  async countCTM(conn) {
    const querySql = `select count(1) from ctm`;
    const [rows] = await conn.execute(querySql);
    return rows
  }
}
module.exports = new HotArticle();
