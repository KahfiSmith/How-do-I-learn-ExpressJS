import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
  const type = req.get("accept");
  res.send(`Hello ${type}`);
});

test("test query parameter", async () => {
  const response = await request(app).get("/")
  .set("Accept", "text/plain");
  expect(response.text).toBe("Hello text/plain");
});
