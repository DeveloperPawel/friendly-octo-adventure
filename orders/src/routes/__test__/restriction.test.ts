import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Restriction } from "../../models/restriction";
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

it("admin add restriction", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "mechanical soft",
  });
  await restriction.save();

  expect(patient!.restrictions!.length).toEqual(0);

  const response = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restrictId,
      patientId,
    })
    .expect(200);

  const updatedpatient = await Patient.findOne({ patientId });
  expect(updatedpatient!.restrictions!.length).toEqual(1);
});

it("provider add restriction", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "mechanical soft",
  });
  await restriction.save();

  expect(patient!.restrictions!.length).toEqual(0);

  const response = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restrictId,
      patientId,
    })
    .expect(200);

  const updatedpatient = await Patient.findOne({ patientId });
  expect(updatedpatient!.restrictions!.length).toEqual(1);
});

it("admin delete restriction", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();

  patient!.restrictions!.push(restriction);
  await patient!.save();
  expect(patient!.restrictions!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restrictId,
      patientId,
    })
    .expect(202);

  const updatedpatient = await Patient.findOne({ patientId });
  expect(updatedpatient!.restrictions!.length).toEqual(0);
});

it("provider delete restriction", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId, patient } =
    await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();

  patient!.restrictions!.push(restriction);
  await patient!.save();
  expect(patient!.restrictions!.length).toEqual(1);

  const response = await request(app)
    .post(`/api/order/delete-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restrictId,
      patientId,
    })
    .expect(202);

  const updatedpatient = await Patient.findOne({ patientId });
  expect(updatedpatient!.restrictions!.length).toEqual(0);
});

it("retrieves all restrictions", async () => {
  const providerCookie = global.providersignin();

  const restriction = Restriction.build({
    restrictionId: new mongoose.Types.ObjectId().toHexString(),
    type: "mechanical soft",
  });
  await restriction.save();

  const restriction2 = Restriction.build({
    restrictionId: new mongoose.Types.ObjectId().toHexString(),
    type: "mechanical soft",
  });
  await restriction2.save();

  const response = await request(app)
    .get(`/api/order/restrictions`)
    .set("Cookie", providerCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(2);
});
