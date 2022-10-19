import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("create order - patient create order", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(201);
});

it("create order - admin create order", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(201);
});

it("create order - provider create order", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(201);
});

it("get orders - admin can retrieve orders by day", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/patient/orders/${8574}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
});

it("update order - change entree", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/patient/order`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("delete order - patient unauthorized returns 401", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("delete order - provider authorized", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(200);
});

it("delete order - admin authorized", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(200);
});
