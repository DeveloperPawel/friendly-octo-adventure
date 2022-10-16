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
  provider.save();

  await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", adminCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);
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

  await request(app)
    .post(`/api/patient/add`)
    .set("Cookie", providerCookie)
    .send({
      patientId: patient.id,
      providerId: provider.id,
    })
    .expect(201);
});
