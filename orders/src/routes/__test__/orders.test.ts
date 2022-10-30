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
import { formatDateAlpha } from "../../models/day";

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

it("create order - patient create order", async () => {
  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId,
      date: new Date(),
      patientId,
    })
    .expect(201);

  expect(response.body?.entree.entreeId).toEqual(entreeId);
});

it("patient retrieves patients orders", async () => {
  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  let amount = 2;

  for (let index = 0; index < amount; index++) {
    await request(app)
      .post(`/api/order/create-order`)
      .set("Cookie", patientCookie)
      .send({
        entreeId,
        patientId,
        date: new Date(),
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

  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  let amount = 2;

  for (let index = 0; index < amount; index++) {
    await request(app)
      .post(`/api/order/create-order`)
      .set("Cookie", patientCookie)
      .send({
        entreeId,
        date: new Date(),
        patientId,
      })
      .expect(201);
  }

  const response = await request(app)
    .get(`/api/order/patient/orders/${formatDateAlpha(new Date())}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);

  expect(response.body?.length).toEqual(amount);
});

it("update order - change entree", async () => {
  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId,
      date: new Date(),
      patientId,
    })
    .expect(201);

  const orderId = response.body.id;

  let secondEntreeId = new mongoose.Types.ObjectId().toHexString();
  let newEntree = Entree.build({
    entreeId: secondEntreeId,
    name: "toast",
    foodItems: [bread],
  });
  await newEntree.save();

  const secResponse = await request(app)
    .post(`/api/order/patient/order`)
    .set("Cookie", patientCookie)
    .send({
      patientId,
      orderId,
      entreeId: secondEntreeId,
    })
    .expect(200);

  expect(secResponse.body?.entree.entreeId).toEqual(secondEntreeId);
});

it("delete order - patient unauthorized returns 401", async () => {
  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId,
      date: new Date(),
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

  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId,
      date: new Date(),
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

  const { flour, bread, entree, entreeId, patientCookie, patientId } =
    await setup();

  const createOrderResponse = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId,
      date: new Date(),
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

it("retrieves patients orders ordered by date", async () => {
  const providerCookie = global.providersignin();
  let amount = 4;
  let orderList = [];

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
    let date = new Date();
    date.setDate(date.getDate() - index);
    let order = Order.build({
      orderId,
      patientId: orderId,
      date,
      entree,
    });
    await order.save();
    orderList.push(orderId);
  }

  const response = await request(app)
    .post(`/api/order/patient-orders`)
    .set("Cookie", providerCookie)
    .send({
      orderList,
    })
    .expect(200);

  expect(response.body.length).toEqual(amount);
  expect(
    new Date(response.body[0].date).getTime() >
      new Date(response.body[1].date).getTime()
  ).toEqual(true);
});
