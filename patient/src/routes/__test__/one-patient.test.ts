import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";

it("retrieves one patient as admin", async () => {
  const adminCookie = global.adminsignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patient.id}`)
    .set("Cookie", adminCookie)
    .send({
      patientId: new mongoose.Types.ObjectId().toHexString(),
      discharge: new Date(),
    })
    .expect(200);
});

it("retrieves one patient as provider", async () => {
  const providerCookie = global.providersignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patient.id}`)
    .set("Cookie", providerCookie)
    .expect(200);
});

it("returns 401 when not authorized", async () => {
  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patient.id}`)
    .send()
    .expect(401);
});
