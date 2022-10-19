import request from "supertest";
import { app } from "../app";
import db from "./config/database";

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/auth/signup")
    .send({ email: email, password: password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
