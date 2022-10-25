import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";
import mongoose from "mongoose";
import { Provider } from "../../model/provider";
import { natsWrapper } from "../../nats-wrapper";

it("adds patient to provider as admin", async () => {
  const adminCookie = global.adminsignin();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  let providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", adminCookie)
    .send({
      patientId,
      providerId,
    })
    .expect(201);

  expect(updatedProvider.body?.patients.length).toEqual(1);

  const updatedPatient = await Patient.findOne({ patientId });
  expect(updatedPatient?.providerId).toEqual(providerId);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("adds patient to provider as provider", async () => {
  const providerCookie = global.providersignin();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  let providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", providerCookie)
    .send({
      patientId,
      providerId,
    })
    .expect(201);

  expect(updatedProvider.body?.patients.length).toEqual(1);

  const updatedPatient = await Patient.findOne({ patientId });
  expect(updatedPatient?.providerId).toEqual(providerId);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
