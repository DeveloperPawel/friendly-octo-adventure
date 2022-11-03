import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Provider } from "../../models/provider";

it("admin can retrieve all the providers", async () => {
  const adminCookie = global.signin();
  let amount = 4;
  let providerId = new mongoose.Types.ObjectId().toHexString();
  for (let index = 0; index < amount; index++) {
    let provider = Provider.build({
      providerId,
    });
    await provider.save();
  }

  const response = await request(app)
    .get(`/api/admin/provider-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
