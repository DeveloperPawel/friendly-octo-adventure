import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("patient can retreive a food item", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .get(`/api/order/food-item/${33}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.entreeId).toBeDefined();
});
