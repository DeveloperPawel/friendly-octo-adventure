import request from "supertest";
import { app } from "../../app";
import { Restriction } from "../../models/restriction";

it("admin can create restriction", async () => {
  const adminCookie = global.signin();

  const response = await request(app)
    .post(`/api/admin/create-restriction`)
    .set("Cookie", adminCookie)
    .send({
      type: "mechanical soft",
    })
    .expect(201);
});

it("admin can delete restriction", async () => {
  const adminCookie = global.signin();

  const restriction = Restriction.build({
    type: "liquid",
  });
  await restriction.save();

  const response = await request(app)
    .post(`/api/admin/delete-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
    })
    .expect(202);
});

it("admin can update restriction", async () => {
  const adminCookie = global.signin();

  const restriction = Restriction.build({
    type: "liquid",
  });
  await restriction.save();

  const type = "mech soft";

  const response = await request(app)
    .post(`/api/admin/delete-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
      type,
    })
    .expect(202);

  expect(response.body.type).toEqual(type);
});

it("admin can retrieve all restrictions", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  for (let index = 0; index < amount; index++) {
    let restriction = Restriction.build({
      type: "liquid",
    });
    await restriction.save();
  }

  const response = await request(app)
    .get(`/api/admin/restriction-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
