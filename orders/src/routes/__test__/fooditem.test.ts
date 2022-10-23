import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { UserType } from "@mimenu/common";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";

const setup = async () => {
  const flour = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "flour",
  });
  await flour.save();

  let foodItemId = new mongoose.Types.ObjectId().toHexString();
  const bread = FoodItem.build({
    foodItemId,
    name: "bread",
    ingredients: [flour],
  });
  await bread.save();

  let entreeId = new mongoose.Types.ObjectId().toHexString();
  const entree = Entree.build({
    entreeId,
    name: "toast",
    foodItems: [bread],
  });
  await entree.save();

  const patientId = new mongoose.Types.ObjectId().toHexString();

  const payload = {
    id: patientId,
    role: UserType.Patient,
  };

  const token = jwt.sign(payload, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  const patientCookie = [`session=${base64}`];

  return {
    flour,
    bread,
    foodItemId,
    entree,
    entreeId,
    patientCookie,
    patientId,
  };
};

it("patient can retreive a food item", async () => {
  const {
    flour,
    bread,
    foodItemId,
    entree,
    entreeId,
    patientCookie,
    patientId,
  } = await setup();

  const response = await request(app)
    .get(`/api/order/food-item/${foodItemId}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.foodItemId).toEqual(foodItemId);
});
