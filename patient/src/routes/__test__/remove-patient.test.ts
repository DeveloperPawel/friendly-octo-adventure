import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";
import { Provider } from "../../model/provider";
import { natsWrapper } from "../../nats-wrapper";

it("removes patient from provider as provider", async () => {
  const providerCookie = global.providersignin();

  const providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", providerCookie)
    .send({
      patientId: patientId,
      providerId: providerId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", providerCookie)
    .send({
      providerId: providerId,
      patientId: patientId,
    })
    .expect(202);

  expect(response.body?.patients.length).toEqual(0);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("removes patient from provider as admin", async () => {
  const adminCookie = global.adminsignin();

  const providerId = new mongoose.Types.ObjectId().toHexString();
  const provider = Provider.build({
    providerId,
  });
  await provider.save();

  let patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: new Date(),
  });
  await patient.save();

  const updatedProvider = await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", adminCookie)
    .send({
      patientId: patientId,
      providerId: providerId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", adminCookie)
    .send({
      providerId: providerId,
      patientId: patientId,
    })
    .expect(202);

  expect(response.body?.patients.length).toEqual(0);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
