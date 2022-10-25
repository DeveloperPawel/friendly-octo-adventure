import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Preference } from "../../models/preference";
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

  const entree = Entree.build({
    entreeId: new mongoose.Types.ObjectId().toHexString(),
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

  return { flour, bread, entree, patientCookie, patientId, patient };
};

it("admin add preference", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Admin,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/add-preference`)
    .set("Cookie", adminCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(200);

  const foundPatient = await Patient.findOne({ patientId });
  expect(foundPatient!.preferences!.length).toEqual(1);
});

it("provider add preference", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/add-preference`)
    .set("Cookie", providerCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(200);

  const foundPatient = await Patient.findOne({ patientId });
  expect(foundPatient!.preferences!.length).toEqual(1);
});

it("patient add preference", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/add-preference`)
    .set("Cookie", patientCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(200);
});

it("admin remove preference", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  patient!.preferences!.push(preference);
  await patient.save();
  expect(patient!.preferences!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", adminCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(202);

  const updatedPatient = await Patient.findOne({ patientId });
  expect(updatedPatient!.preferences!.length).toEqual(0);
});

it("provider remove preference", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  patient!.preferences!.push(preference);
  await patient.save();
  expect(patient!.preferences!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", providerCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(202);

  const updatedPatient = await Patient.findOne({ patientId });
  expect(updatedPatient!.preferences!.length).toEqual(0);
});

it("patient remove preference - authorized", async () => {
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference.save();

  patient!.preferences!.push(preference);
  await patient.save();
  expect(patient!.preferences!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", patientCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(202);

  const updatedPatient = await Patient.findOne({ patientId });
  expect(updatedPatient!.preferences!.length).toEqual(0);
});

it("patient remove preference - unauthorized - returns 401", async () => {
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  patient!.preferences!.push(preference);
  await patient.save();
  expect(patient!.preferences!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", patientCookie)
    .send({
      preferenceId: prefId,
      patientId,
    })
    .expect(401);
});

it("retrieves all preferences", async () => {
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const preference = Preference.build({
    preferenceId: new mongoose.Types.ObjectId().toHexString(),
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference.save();

  const preference2 = Preference.build({
    preferenceId: new mongoose.Types.ObjectId().toHexString(),
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference2.save();

  const response = await request(app)
    .get(`/api/order/preferences`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(2);
});
