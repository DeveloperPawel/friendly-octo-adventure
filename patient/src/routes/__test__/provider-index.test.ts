import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Provider } from "../../model/provider";

it("retrieves all providers", async () => {
  const adminCookie = global.adminsignin();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  provider.save();

  await request(app)
    .get(`/api/patient/providers`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
});
