import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("patient can retrieve patient", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/patient/${234}`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("patient can not retrieve another patient", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/patient/${234}`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("provider can retrieve patient", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/patient/${234}`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(200);
});

it("admin can retrieve patient", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/patient/${345}`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(200);
});
