import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("Creates a new Provider", async () => {
  await request(app)
    .post(`/api/patient/provider/new`)
    .send({
      providerId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(201);
});
