import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { User, UserType } from "../../models/user";

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

it("creates a patient", async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);
});

it("creates one admin", async () => {
  const adminCookie = await request(app)
    .post("/api/auth/admin")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);

  const secondAttempt = await request(app)
    .post("/api/auth/admin")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(401);
});

it("creates a provider", async () => {
  const admin = User.build({
    email: "test@test.com",
    password: "testpassword",
    role: UserType.Admin,
  });
  admin.save();

  const response = await request(app)
    .post(`/api/auth/signup/${admin.id}`)
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(201);
});
