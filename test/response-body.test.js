import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(`<html><body>Hello World</body></html>`);
});

test("test response body", async () => {
  const response = await request(app).get("/");
  expect(response.get("Content-Type")).toContain("text/html");
  expect(response.text).toBe("<html><body>Hello World</body></html>");
});
