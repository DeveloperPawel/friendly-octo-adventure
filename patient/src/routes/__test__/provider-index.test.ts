import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Provider } from "../../model/provider";

it("retrieves all providers", async () => {
  const adminCookie = global.adminsignin();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const provider2 = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const provider3 = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const response = await request(app)
    .get(`/api/patient/providers/5`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(3);
});
