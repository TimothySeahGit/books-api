const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Gang = require("../../models/gang");

const route = (params = "") => {
  const path = "/api/v1/suspects";
  return `${path}/${params}`;
};
