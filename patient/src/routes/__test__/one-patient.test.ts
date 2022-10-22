import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";

it("retrieves one patient as admin", async () => {
  const adminCookie = global.adminsignin();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patient.id}`)
    .set("Cookie", adminCookie)
    .send({
      patientId,
      discharge: new Date(),
    })
    .expect(200);
});

it("retrieves one patient as provider", async () => {
  const providerCookie = global.providersignin();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patientId}`)
    .set("Cookie", providerCookie)
    .expect(200);
});

it("returns 401 when not authorized", async () => {
  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  await request(app)
    .get(`/api/patient/patient/${patientId}`)
    .send()
    .expect(401);
});
