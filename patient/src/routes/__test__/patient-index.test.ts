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
  patient.save();

  await request(app)
    .get(`/api/patient/patients`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
});
