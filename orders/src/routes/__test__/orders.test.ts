import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Patient } from "../../models/patient";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { formatDate, UserType } from "@mimenu/common";

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

it("create order - patient create order", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
      patientId,
    })
    .expect(201);

  expect(response.body?.id).toBeDefined();
});

it("patient retrieves patients orders", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  let amount = 2;

  for (let index = 0; index < amount - 1; index++) {
    let newEntree = Entree.build({
      entreeId: new mongoose.Types.ObjectId().toHexString(),
      foodItems: [bread],
    });
    await newEntree.save();

    await request(app)
      .post(`/api/order/create-order`)
      .set("Cookie", patientCookie)
      .send({
        entreeId: newEntree.id,
        patientId,
      })
      .expect(201);
  }

  const response = await request(app)
    .get(`/api/order/patient/${patientId}`)
    .set("Cookie", patientCookie)
    .send()
    .expect(200);
  expect(response.body?.orders.length).toEqual(amount);
});

it("get orders - admin can retrieve orders by day", async () => {
  const adminCookie = global.adminsignin();

  const { flour, bread, entree, patientCookie, patientId } = await setup();

  let amount = 2;

  for (let index = 0; index < amount - 1; index++) {
    let newEntree = Entree.build({
      entreeId: new mongoose.Types.ObjectId().toHexString(),
      foodItems: [bread],
    });
    await newEntree.save();

    await request(app)
      .post(`/api/order/create-order`)
      .set("Cookie", patientCookie)
      .send({
        entreeId: newEntree.id,
        patientId,
      })
      .expect(201);
  }

  const response = await request(app)
    .post(`/api/order/patient/orders/${formatDate(new Date())}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(amount);
});

it("update order - change entree", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
      patientId,
    })
    .expect(201);

  let newEntree = Entree.build({
    entreeId: new mongoose.Types.ObjectId().toHexString(),
    foodItems: [bread],
  });
  await newEntree.save();

  const secResponse = await request(app)
    .post(`/api/order/patient/order/${response.body?.id}`)
    .set("Cookie", patientCookie)
    .send({
      patientId,
      entreeId: newEntree.id,
    })
    .expect(200);

  expect(secResponse.body?.entreeId).toEqual(newEntree.id);
});

it("delete order - patient unauthorized returns 401", async () => {
  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
      patientId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", patientCookie)
    .send({
      orderId: createOrderResponse.body?.id,
    })
    .expect(401);
});

it("delete order - provider authorized", async () => {
  const providerCookie = global.providersignin();

  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
      patientId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", providerCookie)
    .send({
      orderId: createOrderResponse.body?.id,
    })
    .expect(202);
});

it("delete order - admin authorized", async () => {
  const adminCookie = global.adminsignin();

  const { flour, bread, entree, patientCookie, patientId } = await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
      patientId,
    })
    .expect(201);

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", adminCookie)
    .send({
      orderId: createOrderResponse.body?.id,
    })
    .expect(202);
});
