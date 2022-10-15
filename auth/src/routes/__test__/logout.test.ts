import request from "supertest";
import { app } from "../../app";

it("logs out the current user", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .post("/api/auth/logout")
    .set("Cookie", cookie)
    .send()
    .expect(200);
});
