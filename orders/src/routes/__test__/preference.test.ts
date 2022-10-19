import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("admin create preference", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/create-preference`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(201);
});

it("provider create preference", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/create-preference`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(201);
});

it("patient create preference", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/create-preference`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(201);
});

it("admin remove preference", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(202);
});

it("provider remove preference", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(202);
});

it("patient remove preference - authorized", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(202);
});

it("patient remove preference - unauthorized - returns 401", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(401);
});
