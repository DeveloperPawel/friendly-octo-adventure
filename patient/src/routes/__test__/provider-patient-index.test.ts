import jwt from "jsonwebtoken";
import { UserType } from "@mimenu/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Patient } from "../../model/patient";

const setup = async () => {
  const providerId = new mongoose.Types.ObjectId().toHexString();

  const payload = {
    id: providerId,
    role: UserType.Provider,
  };

  const token = jwt.sign(payload, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  const providerCookie = [`session=${base64}`];

  return { providerCookie, providerId };
};

it("retrieves providers patients", async () => {
  const { providerCookie, providerId } = await setup();
  let amount = 3;

  for (let index = 0; index < amount; index++) {
    let patient = Patient.build({
      patientId: new mongoose.Types.ObjectId().toHexString(),
      providerId,
    });
    await patient.save();
  }

  const response = await request(app)
    .get(`/api/patient/patient-index`)
    .set("Cookie", providerCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
