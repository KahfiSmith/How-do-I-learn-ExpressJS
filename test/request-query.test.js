import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstname} ${req.query.lastname}`);
});

test("test query parameter", async () => {
  const response = await request(app)
  .get("/")
  .query({firstname: "Kahfi", lastname: "Smith"});
  expect(response.text).toBe("Hello Kahfi Smith");
});
