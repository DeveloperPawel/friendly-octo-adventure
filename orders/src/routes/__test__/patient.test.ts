import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Patient } from "../../models/patient";
import { Order } from "../../models/order";

const setup = async () => {
  const flour = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "flour",
  });
  await flour.save();

  const bread = FoodItem.build({
    foodItemId: new mongoose.Types.ObjectId().toHexString(),
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
  const patient = Patient.build({
    patientId,
  });
  await patient.save();

  const payload = {
    id: patientId,
    role: UserType.Patient,
  };

  const token = jwt.sign(payload, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  const patientCookie = [`session=${base64}`];

  return { flour, bread, entree, entreeId, patientCookie, patientId };
};

const providerSetup = async () => {
  const providerId = new mongoose.Types.ObjectId().toHexString();

  const payload = {
    id: providerId,
    role: UserType.Provider,
  };

  const token = jwt.sign(payload, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  const providerCookie = [`session=${base64}`];

  return { providerCookie, providerId };
};

it("patient can retrieve patient", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const response = await request(app)
    .get(`/api/order/patient/${patientId}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);
});

it("patient can not retrieve another patient", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  let secondPatientId = new mongoose.Types.ObjectId().toHexString();
  const patient = Patient.build({
    patientId: secondPatientId,
  });
  await patient.save();

  const response = await request(app)
    .get(`/api/order/patient/${secondPatientId}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(401);
});

it("provider can retrieve patient", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const response = await request(app)
    .get(`/api/order/patient/${patientId}`)
    .set("Cookie", providerCookie)
    .send()
    .expect(200);

  expect(response.body?.patientId).toEqual(patientId);
});

it("admin can retrieve patient", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const response = await request(app)
    .get(`/api/order/patient/${patientId}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.patientId).toEqual(patientId);
});

it("provider can retrieve own patients orders by date", async () => {
  const { providerCookie, providerId } = await providerSetup();
  let amount = 4;
  let patientList = [];

  let ingredient = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await ingredient.save();

  let foodItem = FoodItem.build({
    foodItemId: new mongoose.Types.ObjectId().toHexString(),
    ingredients: [ingredient],
    name: "toast",
  });
  await foodItem.save();

  let entree = Entree.build({
    entreeId: new mongoose.Types.ObjectId().toHexString(),
    foodItems: [foodItem],
    name: "toast breakfast",
  });
  await entree.save();

  for (let index = 0; index < amount; index++) {
    let orderId = new mongoose.Types.ObjectId().toHexString();
    let patientId = new mongoose.Types.ObjectId().toHexString();
    let date = new Date();
    date.setDate(date.getDate() - index);
    let order = Order.build({
      orderId,
      patientId,
      date,
      entree,
    });
    await order.save();
    patientList.push(patientId);
  }

  const response = await request(app)
    .post(`/api/order/patient-orders`)
    .set("Cookie", providerCookie)
    .send({
      patientList,
    })
    .expect(200);

  expect(response.body.length).toEqual(amount);
  expect(
    new Date(response.body[0].date).getTime() >
      new Date(response.body[1].date).getTime()
  ).toEqual(true);
});
