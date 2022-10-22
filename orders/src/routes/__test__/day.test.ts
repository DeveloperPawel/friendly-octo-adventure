import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { formatDate, UserType } from "@mimenu/common";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { Day } from "../../models/day";

const setup = async () => {
  const flour = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    title: "flour",
  });
  await flour.save();

  const bread = FoodItem.build({
    foodItemId: new mongoose.Types.ObjectId().toHexString(),
    ingredients: [flour],
  });
  await bread.save();

  const entree = Entree.build({
    entreeId: new mongoose.Types.ObjectId().toHexString(),
    foodItems: [bread],
  });
  await entree.save();

  let dayId = new mongoose.Types.ObjectId().toHexString();
  const day = Day.build({
    date: new Date(),
    dayId,
    breakfast: [entree],
    lunch: [entree],
    dinner: [entree],
  });
  await day.save();

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

  return { flour, bread, entree, patientCookie, patientId, day, dayId };
};

it("patient can view single day", async () => {
  const { flour, bread, entree, patientCookie, patientId, day, dayId } =
    await setup();
  const response = await request(app)
    .get(`/api/order/day/${formatDate(new Date())}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);
  expect(response.body?.dayId).toEqual(dayId);
});

it("patient can view multiple days", async () => {
  const { flour, bread, entree, patientCookie, patientId, day, dayId } =
    await setup();

  const response = await request(app)
    .get(`/api/order/day-index/5`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(1);
});
