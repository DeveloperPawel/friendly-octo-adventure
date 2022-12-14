import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";

it("retreives all patients", async () => {
  const adminCookie = global.adminsignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const patient2 = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient2.save();

  const patient3 = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient3.save();

  const response = await request(app)
    .get(`/api/patient/patients/5`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(3);
});

it("returns 401 unauthorized", async () => {
  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const response = await request(app)
    .get(`/api/patient/patients/2`)
    .send()
    .expect(401);
});
