import { formatDateAlpha } from "@mimenu/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";

it("changes the discharge date of patient", async () => {
  const adminCookie = global.adminsignin();

  let dischargeDate = new Date("2010-06-10");
  const patientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId,
    discharge: dischargeDate,
  });
  await patient.save();
  expect(patient.discharge).toEqual(dischargeDate);

  let updatedDate = formatDateAlpha(new Date());
  const response = await request(app)
    .post(`/api/patient/update`)
    .set("Cookie", adminCookie)
    .send({
      patientId,
      discharge: new Date(updatedDate),
    })
    .expect(200);

  expect(response.body.discharge).toEqual(new Date(updatedDate).toISOString());
});
