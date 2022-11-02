import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";

it("admin can retrieve all orders", async () => {
  const adminCookie = global.signin();
  let amount = 4;

  let ingredient = Ingredient.build({ name: "flour" });
  await ingredient.save();

  let foodItem = FoodItem.build({ name: "bread", ingredients: [ingredient] });
  await foodItem.save();

  let entree = Entree.build({ name: "toast", foodItems: [foodItem] });
  await entree.save();

  for (let index = 0; index < amount; index++) {
    let patientId = new mongoose.Types.ObjectId().toHexString();
    let order = Order.build({
      patientId,
      date: new Date(),
      entree,
    });
    await order.save();
  }

  const response = await request(app)
    .get(`/api/admin/order-index`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(amount);
});
