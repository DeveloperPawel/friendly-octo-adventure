import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../models/patient";

it("admin can retrieve all patients", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  for (let index = 0; index < amount; index++) {
    let patientId = new mongoose.Types.ObjectId().toHexString();

    let patient = Patient.build({
      patientId,
    });
    await patient.save();
  }

  const response = await request(app)
    .get(`/api/admin/patient-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
