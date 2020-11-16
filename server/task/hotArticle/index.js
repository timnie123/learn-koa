const {
  hkLife,
  hkTechnology,
  exmooLife,
  exmoo,
  facebookTheTripAddict,
  facebookUMagazineHK
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
  async refreshFBTripAddict(conn) {
    await facebookTheTripAddict(conn);
    return true
  }
  async refreshFBUMagazineHK(conn) {
    await facebookUMagazineHK(conn);
    return true
  }
}
module.exports = new Task();
