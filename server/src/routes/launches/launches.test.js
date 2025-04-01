// https://jestjs.io/
// https://www.npmjs.com/package/supertest
// const dateFormat = require("dateformat");

const superTest = require("supertest");
const app = require("../../app");
const {
  mongoConnect,
  mongoDisconnect,
} = require("../../services/mongo");

describe("Testing NASA API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET at /launches", () => {
    test("Response should be 200 SUCCESS", async () => {
      await superTest(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
      // const res = await superTest(app).get("/launches");
      // expect(res.statusCode).toBe(200);
    });
  });

  describe("Test POST at /launches", () => {
    const launchDate = "December 25, 2030";
    const launchData = {
      mission: `TEST MISSION - ${Date()}`,
      rocket: "SUPER TEST ROCKET 1",
      target: "Kepler-1410 b",
    };

    test("Response should be 201 CREATED", async () => {
      const res = await superTest(app)
        .post("/v1/launches")
        .send({ ...launchData, launchDate })
        .expect("Content-Type", /json/)
        .expect(201);

      const dateSent = new Date(launchDate).valueOf();
      const dateReceived = new Date(res.body.launchDate).valueOf();

      // Tests matching:
      expect(dateSent).toBe(dateReceived);
      expect(res.body).toMatchObject(launchData);
    });

    test("Missing requirements should be catch.", () => {});

    test("Invalid dates should be catch.", () => {});
  });
});
