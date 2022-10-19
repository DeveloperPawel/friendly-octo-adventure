import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { formatDate } from "../../../../common/src/functions/date";

it("patient can view single day", async () => {
  const patientCookie = global.patientsignin();
  const response = await request(app)
    .get(`/api/order/day/${formatDate(new Date())}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);
  expect(response.body?.dayId).toBeDefined();
});

it("patient can view multiple days", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .get(`/api/order/day-index`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(1);
});
