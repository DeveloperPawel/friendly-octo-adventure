import request from "supertest";
import { app } from "../../app";
import { Preference } from "../../models/preference";

it("admin can create preference", async () => {
  const adminCookie = global.signin();

  const response = await request(app)
    .post(`/api/admin/create-preference`)
    .set("Cookie", adminCookie)
    .send({
      value: "dairy",
    })
    .expect(201);
  expect(response.body.value).toEqual("dairy");
});

it("admin can delete preference", async () => {
  const adminCookie = global.signin();

  const preference = Preference.build({
    value: "dairy",
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/admin/delete-preference`)
    .set("Cookie", adminCookie)
    .send({
      preferenceId: preference.id,
    })
    .expect(202);
});

it("admin can update preference", async () => {
  const adminCookie = global.signin();

  const preference = Preference.build({
    value: "dairy",
  });
  await preference.save();

  const value = "tree nuts";

  const response = await request(app)
    .post(`/api/admin/update-preference`)
    .set("Cookie", adminCookie)
    .send({
      value,
    })
    .expect(200);

  expect(response.body.value).toEqual(value);
});

it("admin can retrieve all preferences", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  for (let index = 0; index < amount; index++) {
    let preference = Preference.build({
      value: "dairy",
    });
    await preference.save();
  }

  const response = await request(app)
    .get(`/api/admin/preference-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(amount);
});
