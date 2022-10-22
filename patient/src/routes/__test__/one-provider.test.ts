import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Provider } from "../../model/provider";

it("retrieves one provider as provider", async () => {
  const providerCookie = global.providersignin();
  const providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  const response = await request(app)
    .get(`/api/patient/provider/${providerId}`)
    .set("Cookie", providerCookie)
    .send()
    .expect(200);

  expect(response.body?.providerId).toEqual(providerId);
});

it("retrieves one provider as admin", async () => {
  const adminCookie = global.adminsignin();
  const providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  const response = await request(app)
    .get(`/api/patient/provider/${providerId}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.providerId).toEqual(providerId);
});

it("returns 401 unauthorized when accessed by an unauthorized user", async () => {
  const providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  await request(app)
    .get(`/api/patient/provider/${providerId}`)
    .send()
    .expect(401);
});
