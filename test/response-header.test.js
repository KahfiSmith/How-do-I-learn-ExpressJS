import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
  res.set({
    "Fullname": "Kahfi Smith",
    "Male": "yes",
  });
  res.send("Hello World");
});

test("test response", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World");
  expect(response.get("Fullname")).toBe("Kahfi Smith");
  expect(response.get("Male")).toBe("yes");
});
