const {
  hkLife,
  hkTechnology,
  exmooLife,
  exmoo
} = require('./hotArticle');
class Task {
  async refreshHkLife(conn) {
    await hkLife(conn);
    return true
  }
  async refreshHkTec(conn) {
    await hkTechnology(conn);
    return true
  }
  async refreshExmooLife(conn) {
    await exmooLife(conn);
    return true
  }
  async refreshExmooNews(conn) {
    await exmoo(conn);
    return true
  }
}
module.exports = new Task();
