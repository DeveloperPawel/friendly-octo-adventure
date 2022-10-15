import request from "supertest";
import { app } from "../../app";

it("returns details about the active user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/auth/current")
    .set("Cookie", cookie)
    .send()
    .expect(200);
});

it("response is null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/auth/current")
    .send()
    .expect(200);

  expect(response.body.user).toEqual(null);
});
