import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("admin create restriction", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/create-restriction`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(201);
});

it("provider create restriction", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/create-restriction`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(201);
});

it("admin update restriction", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/update-restriction`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(201);
});

it("provider update restriction", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/update-restriction`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(201);
});

it("admin delete restriction", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/delete-restriction`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(202);
});

it("provider delete restriction", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/delete-restriction`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(202);
});
