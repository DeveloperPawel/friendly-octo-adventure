import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("creates new patient", async () => {
  await request(app)
    .post(`/api/patient/new`)
    .send({
      discharge: new Date(),
    })
    .expect(201);
});
