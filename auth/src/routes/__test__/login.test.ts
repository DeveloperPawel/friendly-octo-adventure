import request from "supertest";
import { app } from "../../app";

it("should throw an error if the user does not exist", async () => {
  return await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@test.com",
      password: "testpassword",
    })
    .expect(400);
});
