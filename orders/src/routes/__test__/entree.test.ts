import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("patient can retreive an entree", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .get(`/api/order/entree/${787}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.entreeId).toBeDefined();
});
