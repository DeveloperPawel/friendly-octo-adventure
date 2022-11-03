import request from "supertest";
import { app } from "../../app";
import { Ingredient } from "../../models/ingredient";

it("admin can create ingredient", async () => {
  const adminCookie = global.signin();

  const response = await request(app)
    .post(`/api/admin/create-ingredient`)
    .set("Cookie", adminCookie)
    .send({
      name: "flour",
    })
    .expect(200);
  expect(response.body.name).toEqual("flour");
});

it("admin can delete ingredient", async () => {
  const adminCookie = global.signin();

  let ingredient = Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const response = await request(app)
    .post(`/api/admin/delete-ingredient`)
    .set("Cookie", adminCookie)
    .send({
      ingredientId: ingredient.id,
    })
    .expect(202);
});

it("admin can update ingredient", async () => {
  const adminCookie = global.signin();

  let ingredient = Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  let name = "almond";

  const response = await request(app)
    .post(`/api/admin/update-ingredient`)
    .set("Cookie", adminCookie)
    .send({
      ingredientId: ingredient.id,
      name,
    })
    .expect(200);
  expect(response.body.name).toEqual(name);
});

it("admin can retrieve all ingredients", async () => {
  const adminCookie = global.signin();
  let amount = 4;
  for (let index = 0; index < amount; index++) {
    let ingredient = Ingredient.build({
      name: "flour",
    });
    await ingredient.save();
  }

  const response = await request(app)
    .get(`/api/admin/ingredient-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(amount);
});
