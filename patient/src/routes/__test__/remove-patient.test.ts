import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";
import { Provider } from "../../model/provider";

it("removes patient from provider as provider", async () => {
  const providerCookie = global.providersignin();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", providerCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", providerCookie)
    .send({
      providerId: provider.id,
      patientId: patient.id,
    })
    .expect(202);

  expect(response.body?.patients.length).toEqual(0);
});

it("removes patient from provider as admin", async () => {
  const adminCookie = global.adminsignin();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  await provider.save();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  await patient.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", adminCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", adminCookie)
    .send({
      providerId: provider.id,
      patientId: patient.id,
    })
    .expect(202);

  expect(response.body?.patients.length).toEqual(0);
});
