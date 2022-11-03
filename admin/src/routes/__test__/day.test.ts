import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { formatDate, UserType } from "@mimenu/common";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { Day } from "../../models/day";

it("admin can create day", async () => {
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
    .post(`/api/admin/create-day`)
    .set("Cookie", adminCookie)
    .send({
      date: new Date(),
      breakfast: [entree.id],
      lunch: [entree.id],
      dinner: [entree.id, entree.id],
    })
    .expect(201);
});

it("admin can delete day", async () => {
  const adminCookie = global.signin();

  const day = Day.build({
    date: new Date(),
  });
  await day.save();

  const response = await request(app)
    .post(`/api/admin/delete-day`)
    .set("Cookie", adminCookie)
    .send({
      dayId: day.id,
    })
    .expect(202);
});

it("admin can update day", async () => {
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

  const entree2 = await Entree.build({
    name: "toast",
    foodItems: [foodItem],
  });
  await entree2.save();

  const day = Day.build({
    date: new Date(),
    dinner: [entree],
  });
  await day.save();

  const response = await request(app)
    .post(`/api/admin/update-day`)
    .set("Cookie", adminCookie)
    .send({
      dayId: day.id,
      date: new Date(),
      breakfast: [entree.id],
      lunch: [entree2.id],
      dinner: [],
    })
    .expect(200);
  expect(response.body.dinner.length).toEqual(0);
});

it("admin can retrieve all days", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  for (let index = 0; index < amount; index++) {
    let day = Day.build({
      date: new Date(),
    });
    await day.save();
  }

  const response = await request(app)
    .get(`/api/admin/day-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
