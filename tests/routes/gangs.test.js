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
      {
        members: [
          {
            _id: "5c9b491ea73b4457249403e2",
            gang: "5c9b491da73b4457249403e0",
            name: "Scruffles",
            description: "Scruffy. Hasn't bathed in years",
            __v: 0
          },
          {
            _id: "5c9b491ea73b4457249403e3",
            gang: "5c9b491da73b4457249403e0",
            name: "Mad Cat",
            description: "Where did he get that Mech?",
            __v: 0
          }
        ],
        _id: "5c9b491da73b4457249403e0",
        name: "Ku Klutz Katz",
        description: "Cats in White",
        __v: 0
      },
      {
        members: [
          {
            _id: "5c9b491ea73b4457249403e8",
            gang: "5c9b491ea73b4457249403e6",
            name: "Robert",
            description: "Ordinary cat",
            __v: 0
          }
        ],
        _id: "5c9b491ea73b4457249403e6",
        name: "The Lyin' Kings",
        description: "Just lying around",
        __v: 0
      }
    ]);
    await Suspect.insertMany([
      {
        _id: "5c9b4c0632f3d647d0582d5f",
        gang: {
          members: ["5c9b4c0632f3d647d0582d5f", "5c9b4c0632f3d647d0582d60"],
          _id: "5c9b4c0532f3d647d0582d5d",
          name: "Ku Klutz Katz",
          description: "Cats in White",
          __v: 0
        },
        name: "Scruffles",
        description: "Scruffy. Hasn't bathed in years",
        __v: 0
      },
      {
        _id: "5c9b4c0632f3d647d0582d60",
        gang: {
          members: ["5c9b4c0632f3d647d0582d5f", "5c9b4c0632f3d647d0582d60"],
          _id: "5c9b4c0532f3d647d0582d5d",
          name: "Ku Klutz Katz",
          description: "Cats in White",
          __v: 0
        },
        name: "Mad Cat",
        description: "Where did he get that Mech?",
        __v: 0
      },
      {
        _id: "5c9b4c0632f3d647d0582d65",
        gang: {
          members: ["5c9b4c0632f3d647d0582d65"],
          _id: "5c9b4c0632f3d647d0582d63",
          name: "The Lyin' Kings",
          description: "Just lying around",
          __v: 0
        },
        name: "Robert",
        description: "Ordinary cat",
        __v: 0
      }
    ]);
  });

  afterEach(async () => {
    await db.dropCollection("gangs");
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongod.stop();
  });

  test("gets gangs and members in gangs", async () => {
    const res = await request(app)
      .get(route("Ku Klutz Katz"))
      .expect("content-type", /json/)
      .expect(200);
    console.log(res.body);
    expect(res.body.name).toBe("Ku Klutz Katz");
    // expect(res.body.members[0]).toBe("5c9b491ea73b4457249403e2");
  });
});
