module.exports = class OfflineDB {
  constructor(db) {
    this._db = db || {};
    this._obj;
    this._parsed;
  }

  ref(path) {
    let parsed = path.split("/");
    let obj = this._db;

    for (let i = 0; i < parsed.length; i++) {
      obj = obj[parsed[i]];
    }

    this._obj = obj;
    this._parsed = parsed;
    return this;
  }

  push(obj) {
    let newId = `ID${Object.keys(this._db.users).length + 1}`;
    let dbPath;

    for (let i = 0; i < this._parsed.length; i++) {
      dbPath = this._db[this._parsed[i]];
      dbPath[newId] = obj;
    }
    return newId;
  }

  remove() {
    let dbPath = this._db;
    if (this._parsed.length === 1) {
      delete this._db[this._parsed[0]];
    } else {
      for (let i = 0; i < this._parsed.length - 1; i++) {
        dbPath = dbPath[this._parsed[i]];
      }
      delete dbPath[this._parsed[this._parsed.length - 1]];
    }
  }

  once() {
    return this._obj;
  }
};
