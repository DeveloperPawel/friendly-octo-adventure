import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Patient } from "../../models/patient";

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
