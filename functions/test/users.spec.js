const { expect } = require("chai");
const admin = require("firebase-admin");
admin.initializeApp();
const users = require("../users").users;

const id = "55555555K"
const anotherId = "11111111A"
let realRes = {};
const res = {
  status: (status) => {
    realStatus = status;
    return { json: (res) => realRes = res };
  }
}
let realStatus = 0;

describe("Unit tests", () => {
  it("tests create user", async () => {
    const req = { body: {id: id, name: "Janet"} };   
    await users.create(req, res)
    ref = admin.firestore().collection('users').doc(id)
    doc = await ref.get();
    expect(realRes).to.deep.eq({result: `user with ID: ${id} added.`})
    expect(doc.data()).to.deep.eq({name: "Janet"});
    expect(realStatus).to.eq(201)

    //Test create again with user that already exists
    await users.create(req, res);
    expect(realRes).to.deep.eq({result: `user with ID: ${id} already exists.`});
    expect(realStatus).to.eq(409);
  });

  it("tests get user", async () => {
    const req = { params: {id: id} };
    await users.get(req, res);
    expect(realRes).to.deep.eq({id: id, name: "Janet"});
    expect(realStatus).to.eq(200);

    //Test get user that does not exists
    req.params.id = anotherId;
    await users.get(req, res);
    expect(realRes).to.deep.eq({result: `user with ID: ${anotherId} does not exists.`});
    expect(realStatus).to.eq(404);
  });

  it("tests update user", async () => {
    const req = { params: {id: id}, body: {name: "Maria"} };
    await users.update(req, res);
    ref = admin.firestore().collection('users').doc(id);
    doc = await ref.get();
    expect(realRes).to.deep.eq({result: `user with ID: ${id} updated.`});
    expect(doc.data()).to.deep.eq({name: "Maria"});
    expect(realStatus).to.eq(200);

    //Test update user that does not exists
    req.params.id = anotherId;
    await users.update(req, res);
    expect(realRes).to.deep.eq({result: `user with ID: ${anotherId} does not exists.`});
    expect(realStatus).to.eq(404);
  });

  it("tests delete user", async () => {
    const req = { params: {id: id} };
    await users.delete(req, res);
    ref = admin.firestore().collection('users').doc(id);
    doc = await ref.get();
    expect(realRes).to.deep.eq({result: `user with ID: ${id} deleted.`});
    expect(doc.exists).to.deep.eq(false);
    expect(realStatus).to.eq(200);

    //Test delete user that does not exists
    req.params.id = anotherId;
    await users.delete(req, res);
    expect(realRes).to.deep.eq({result: `user with ID: ${anotherId} does not exists.`});
    expect(realStatus).to.eq(404);
  });

  it("tests list users", async () => {
    let req = {};
    // Test with no user
    await users.list(req, res);
    expect(realRes).to.deep.eq([]);
    expect(realStatus).to.eq(200);

    // Test with one user
    req = { body: {id: id, name: "Janet"} };
    await users.create(req, res);
    await users.list(req, res);
    expect(realRes).to.deep.eq([{id: id, name: "Janet"}]);
    expect(realStatus).to.eq(200);

    // Test with two users
    req = { body: {id: anotherId, name: "Maria"} };
    await users.create(req, res);
    await users.list(req, res);
    expect(realRes).to.deep.eq([{id: anotherId, name: "Maria"}, {id: id, name: "Janet"}]);
    expect(realStatus).to.eq(200);
  });

});
