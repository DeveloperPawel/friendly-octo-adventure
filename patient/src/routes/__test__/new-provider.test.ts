import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("Creates a new Provider as admin", async () => {
  const adminCookie = global.adminsignin();
  const providerId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/patient/provider/new`)
    .set("Cookie", adminCookie)
    .send({
      providerId,
    })
    .expect(201);

  expect(response.body?.providerId).toEqual(providerId);
});

it("Creates a new Provider as provider", async () => {
  const providerCookie = global.providersignin();
  const providerId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/patient/provider/new`)
    .set("Cookie", providerCookie)
    .send({
      providerId,
    })
    .expect(201);

  expect(response.body?.providerId).toEqual(providerId);
});
