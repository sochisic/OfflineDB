const OfflineDB = require("./offlinedb");

let db = new OfflineDB({
  users: {
    ID1: {
      name: "Alice",
      email: "alice@email.com"
    }
  }
});

describe("OfflineDB", () => {
  test("OfflineDB ref", () => {
    let db = new OfflineDB();
    expect(db).toHaveProperty("ref");
  });
  test("OfflineDB push", () => {
    expect(db).toHaveProperty("push");
  });
  test("OfflineDB remove", () => {
    expect(db).toHaveProperty("remove");
  });
  test("OfflineDB once", () => {
    expect(db).toHaveProperty("once");
  });
  test("OfflineDB push user", () => {
    const id = db.ref("users").push({
      name: "Bob",
      address: {
        city: "New York",
        country: "US"
      }
    });
    expect(id).toBe("ID2");
  });
  test("OfflineDB once", () => {
    expect(db.ref("users/ID2/address/city").once()).toBe("New York");
  });
  test("OfflineDB once2", () => {
    expect(db.ref("users/ID1").once()).toEqual({
      name: "Alice",
      email: "alice@email.com"
    });
  });
  test("OfflineDB remove", () => {
    db.ref("users/ID2/address").remove();
    expect(db._db).toMatchObject({
      users: {
        ID1: {
          name: "Alice",
          email: "alice@email.com"
        },
        ID2: {
          name: "Bob"
        }
      }
    });
  });
});
