import request from "supertest";
import { app } from "../../app";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";

it("admin can create foodItem", async () => {
  const adminCookie = global.signin();

  const ingredient = Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const response = await request(app)
    .post(`/api/admin/create-fooditem`)
    .set("Cookie", adminCookie)
    .send({
      name: "bread",
      ingredients: [ingredient.id],
    })
    .expect(201);
});

it("admin can delete foodItem", async () => {
  const adminCookie = global.signin();

  const ingredient = await Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const foodItem = FoodItem.build({
    name: "bread",
    ingredients: [ingredient],
  });
  await foodItem.save();

  const response = await request(app)
    .post(`/api/admin/delete-fooditem`)
    .set("Cookie", adminCookie)
    .send({
      foodItemId: foodItem.id,
    })
    .expect(202);
});

it("admin can update foodItem", async () => {
  const adminCookie = global.signin();

  const ingredient = await Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const ingredient2 = await Ingredient.build({
    name: "almond",
  });
  await ingredient.save();

  const foodItem = FoodItem.build({
    name: "bread",
    ingredients: [ingredient],
  });
  await foodItem.save();

  const response = await request(app)
    .post(`/api/admin/update-fooditem`)
    .set("Cookie", adminCookie)
    .send({
      name: "new bread",
      ingredients: [ingredient.id, ingredient2.id],
    })
    .expect(200);
});

it("admin can retrieve all foodItems", async () => {
  const adminCookie = global.signin();
  let amount = 4;
  const ingredient = await Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  for (let index = 0; index < amount; index++) {
    let foodItem = FoodItem.build({
      name: "bread",
      ingredients: [ingredient],
    });
    await foodItem.save();
  }

  const response = await request(app)
    .get(`/api/admin/fooditem-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
