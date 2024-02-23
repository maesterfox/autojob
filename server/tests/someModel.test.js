// Example test file: server/tests/someModel.test.js
const mongoose = require("mongoose");
const dbHandler = require("./dbHandler");
const SomeModel = require("../models/someModel");

// Connect to a new in-memory database before running any tests
beforeAll(async () => await dbHandler.connect());

// Clear all test data after every test
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server
afterAll(async () => await dbHandler.closeDatabase());

// Example test case
describe("SomeModel Test", () => {
  it("can be created correctly", async () => {
    // Expect something about SomeModel
  });
});
