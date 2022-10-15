import request from "supertest";
import { app } from "../../app";

it("returns 201 after successful signup", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);
});

it("returns 400 with an invalid email", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "testtest.com",
      password: "testpassword",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "word",
    })
    .expect(400);
});

it("returns a 400 with an empty body", async () => {
  return await request(app).post("/api/auth/signup").send({}).expect(400);
});

it("duplicate emails are rejected", async () => {
  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(400);
});

it("sets a cookie with valid signup", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
