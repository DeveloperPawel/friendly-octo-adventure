import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Preference } from "../../models/preference";

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

  return { flour, bread, entree, patientCookie, patientId };
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
      preferenceId: preference.id,
      patientId,
    })
    .expect(201);
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
      preferenceId: preference.id,
      patientId,
    })
    .expect(201);
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
      preferenceId: preference.id,
      patientId,
    })
    .expect(200);
});

it("admin remove preference", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/delete-preference`)
    .set("Cookie", adminCookie)
    .send({
      preferenceId: preference.id,
      patientId,
    })
    .expect(202);
});

it("provider remove preference", async () => {
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
    .post(`/api/order/remove-preference`)
    .set("Cookie", providerCookie)
    .send({
      preferenceId: preference.id,
      patientId,
    })
    .expect(202);
});

it("patient remove preference - authorized", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Patient,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/remove-preference`)
    .set("Cookie", patientCookie)
    .send({
      preferenceId: preference.id,
      patientId,
    })
    .expect(202);
});

it("patient remove preference - unauthorized - returns 401", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const prefId = new mongoose.Types.ObjectId().toHexString();
  const preference = Preference.build({
    preferenceId: prefId,
    value: "dairy",
    userType: UserType.Provider,
  });
  await preference.save();

  const response = await request(app)
    .post(`/api/order/remove-preference`)
    .set("Cookie", patientCookie)
    .send({
      preferenceId: preference.id,
      patientId,
    })
    .expect(401);
});
