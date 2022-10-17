import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";
import mongoose from "mongoose";
import { Provider } from "../../model/provider";

it("adds patient to provider as admin", async () => {
  const adminCookie = global.adminsignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", adminCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);

  expect(updatedProvider.body?.patients.length).toEqual(1);

  const updatedPatient = await Patient.findById(patient.id);
  expect(updatedPatient?.providerId).toEqual(provider.id);
});

it("adds patient to provider as provider", async () => {
  const providerCookie = global.providersignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  provider.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", providerCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);

  expect(updatedProvider.body?.patients.length).toEqual(1);

  const updatedPatient = await Patient.findById(patient.id);
  expect(updatedPatient?.providerId).toEqual(provider.id);
});
