import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("creates new patient", async () => {
  const patientId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/patient/new`)
    .send({
      patientId,
      discharge: new Date(),
    })
    .expect(201);

  expect(response.body).toEqual(patientId);
});
