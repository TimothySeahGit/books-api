const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Suspect = require("../../models/suspect");

const route = (params = "") => {
  const path = "/api/v1/suspects";
  return `${path}/${params}`;
};

describe("Suspects", () => {
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
    await Suspect.insertMany([
      { name: "Scruffles", description: "Scruffy. Hasn't bathed in years" },
      { name: "Mad Cat", description: "Where did he get that Mech?" },
      { name: "The Lyin' King", description: "There he lies" }
    ]);
  });

  afterEach(async () => {
    await db.dropCollection("suspects");
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongod.stop();
  });

  describe("GET and POST methods", () => {
    test("returns all suspects", () => {
      const expectedSuspects = [
        { name: "Scruffles", description: "Scruffy. Hasn't bathed in years" },
        { name: "Mad Cat", description: "Where did he get that Mech?" },
        { name: "The Lyin' King", description: "There he lies" }
      ];
      return request(app)
        .get(route())
        .expect("content-type", /json/)
        .expect(200)
        .then(res => {
          const suspects = res.body;
          suspects.forEach((suspect, index) => {
            expect(suspect.name).toBe(expectedSuspects[index].name);
            expect(suspect.description).toBe(
              expectedSuspects[index].description
            );
          });
        });
    });

    test("find suspect by id", async () => {
      const addedSuspect = { name: "httpcat201", description: "created" };
      const res = await request(app)
        .post(route())
        .send(addedSuspect)
        .expect("content-type", /json/)
        .expect(201);

      expect(res.body.name).toBe("httpcat201");
      expect(res.body.description).toBe("created");

      const suspect = await Suspect.findOne({ name: "httpcat201" });
      expect(suspect.description).toBe("created");
    });

    test("adds suspect to database", async () => {
      const addedSuspect = { name: "httpcat201", description: "created" };
      const res = await request(app)
        .post(route())
        .send(addedSuspect)
        .expect("content-type", /json/)
        .expect(201);

      expect(res.body.name).toBe("httpcat201");
      expect(res.body.description).toBe("created");

      const suspect = await Suspect.findOne({ name: "httpcat201" });
      expect(suspect.description).toBe("created");
    });
  });
});

describe("gangs", () => {});
