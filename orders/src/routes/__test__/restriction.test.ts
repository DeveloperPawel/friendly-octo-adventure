import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredient";
import { FoodItem } from "../../models/fooditem";
import { Entree } from "../../models/entree";
import { UserType } from "@mimenu/common";
import { Restriction } from "../../models/restriction";

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

it("admin add restriction", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "mechanical soft",
  });
  await restriction.save();

  const response = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);
});

it("provider add restriction", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "mechanical soft",
  });
  await restriction.save();

  const response = await request(app)
    .post(`/api/order/create-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);
});

it("admin update restriction", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictIdMech = new mongoose.Types.ObjectId().toHexString();
  const restrictionMech = Restriction.build({
    restrictionId: restrictIdMech,
    type: "mechanical soft",
  });
  await restrictionMech.save();

  const firstResponse = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restrictionMech.id,
      patientId,
    })
    .expect(201);

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();

  const response = await request(app)
    .post(`/api/order/update-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);
});

it("provider update restriction", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictIdMech = new mongoose.Types.ObjectId().toHexString();
  const restrictionMech = Restriction.build({
    restrictionId: restrictIdMech,
    type: "mechanical soft",
  });
  await restrictionMech.save();

  const firstResponse = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restrictionMech.id,
      patientId,
    })
    .expect(201);

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();
  const response = await request(app)
    .post(`/api/order/update-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);
});

it("admin delete restriction", async () => {
  const adminCookie = global.adminsignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();

  const firstResponse = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/order/remove-restriction`)
    .set("Cookie", adminCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(200);
});

it("provider delete restriction", async () => {
  const providerCookie = global.providersignin();
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const restrictId = new mongoose.Types.ObjectId().toHexString();
  const restriction = Restriction.build({
    restrictionId: restrictId,
    type: "liquid",
  });
  await restriction.save();

  const firstResponse = await request(app)
    .post(`/api/order/add-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/order/remove-restriction`)
    .set("Cookie", providerCookie)
    .send({
      restrictionId: restriction.id,
      patientId,
    })
    .expect(200);
});
