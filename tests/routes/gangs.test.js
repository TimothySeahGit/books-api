const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Gang = require("../../models/gang");
const Suspect = require("../../models/suspect");

const route = (params = "") => {
  const path = "/api/v1/gangs";
  return `${path}/${params}`;
};

describe("Gangs", () => {
  let mongod;
  let db;

  beforeAll(async () => {
    jest.setTimeout(120000);
    mongod = new MongoMemoryServer();
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    });
    db = mongoose.connection;
  });

  beforeEach(async () => {
    await Gang.insertMany([
      { name: "Scruffles", description: "Scruffy. Hasn't bathed in years" },
      { name: "Mad Cat", description: "Where did he get that Mech?" },
      { name: "The Lyin' King", description: "There he lies" }
    ]);
  });

  afterEach(async () => {
    await db.dropCollection("gangs");
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongod.stop();
  });

  test("gets all members associated with a gang", () => {});
});
