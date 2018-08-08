let OfflineDB = require("./offlinedb");

let db = new OfflineDB({
  users: {
    ID1: {
      name: "Alice",
      email: "alice@email.com"
    },
    ID2: {
      name: "Bob",
      address: { city: "New York", country: "US" }
    }
  }
});

const id = db.ref("users").push({
  name: "Stas",
  address: {
    city: "Krasnodar",
    country: "RUS"
  }
});
console.log(id);

console.log(db._db);

let result = db.ref("users/ID2/address/city").once();
console.log(result);

let result2 = db.ref("users/ID1").once();
console.log(result2);

db.ref("users/ID2/address").remove();
console.log(`DB state after delete`);
console.log(db._db);

db.ref("users").remove();
console.log(db._db);
