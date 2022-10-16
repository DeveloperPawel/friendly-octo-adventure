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
  provider.save();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  patient.save();

  await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", providerCookie)
    .send({
      providerId: provider.id,
      patientId: patient.id,
    })
    .expect(202);
});

it("removes patient from provider as admin", async () => {
  const adminCookie = global.adminsignin();

  const provider = Provider.build({
    providerId: new mongoose.Types.ObjectId().toHexString(),
  });
  provider.save();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
    discharge: new Date(),
  });
  patient.save();

  await request(app)
    .post(`/api/patient/remove`)
    .set("Cookie", adminCookie)
    .send({
      providerId: provider.id,
      patientId: patient.id,
    })
    .expect(202);
});
