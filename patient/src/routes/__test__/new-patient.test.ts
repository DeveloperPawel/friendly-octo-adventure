import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("creates new patient", async () => {
  await request(app)
    .post(`/api/patient/new`)
    .send({
      patientId: new mongoose.Types.ObjectId().toHexString(),
      discharge: new Date(),
    })
    .expect(201);
});
