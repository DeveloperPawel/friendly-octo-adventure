import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("creates new patient", async () => {
  const adminCookie = global.adminsignin();
  const patientId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/patient/new`)
    .set("Cookie", adminCookie)
    .send({
      patientId,
      discharge: new Date(),
    })
    .expect(201);

  expect(response.body?.patientId).toEqual(patientId);
});
