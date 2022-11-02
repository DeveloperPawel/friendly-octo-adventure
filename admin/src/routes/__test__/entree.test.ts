import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";

it("admin can create entree", async () => {
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
    .post(`/api/admin/create-fooditem`)
    .set("Cookie", adminCookie)
    .send({
      name: "toast",
      fooditems: [foodItem.id],
    })
    .expect(201);
});

it("admin can delete entree", async () => {
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

  const entree = await Entree.build({
    name: "toast",
    foodItems: [foodItem],
  });
  await entree.save();

  const response = await request(app)
    .post(`/api/admin/delete-entree`)
    .set("Cookie", adminCookie)
    .send({
      entreeId: entree.id,
    })
    .expect(202);
});

it("admin can update entree", async () => {
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

  const foodItem2 = FoodItem.build({
    name: "bread2",
    ingredients: [ingredient],
  });
  await foodItem2.save();

  const entree = await Entree.build({
    name: "toast",
    foodItems: [foodItem],
  });
  await entree.save();

  const response = await request(app)
    .post(`/api/admin/update-entree`)
    .set("Cookie", adminCookie)
    .send({
      name: "new toast",
      foodItems: [foodItem.id, foodItem2.id],
    })
    .expect(200);

  expect(response.body.foodItems.length).toEqual(2);
});

it("admin can retrieve all entrees", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  const ingredient = await Ingredient.build({
    name: "flour",
  });
  await ingredient.save();

  const foodItem = FoodItem.build({
    name: "bread",
    ingredients: [ingredient],
  });
  await foodItem.save();

  for (let index = 0; index < amount; index++) {
    let entree = await Entree.build({
      name: "toast",
      foodItems: [foodItem],
    });
    await entree.save();
  }

  const response = await request(app)
    .get(`/api/admin/entree-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(amount);
});
