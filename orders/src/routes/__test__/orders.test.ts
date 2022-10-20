import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { Patient } from "../../models/patient";
import { Entree } from "../../models/entree";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";

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

  return { flour, bread, entree };
};

it("create order - patient create order", async () => {
  const patientCookie = global.patientsignin();

  const patient = Patient.build({
    patientId: new mongoose.Types.ObjectId().toHexString(),
  });
  await patient.save();

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

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", patientCookie)
    .send({
      entreeId: entree.id,
    })
    .expect(201);
});

it("create order - admin create order", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(201);
});

it("create order - provider create order", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/create-order`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(201);
});

it("get orders - admin can retrieve orders by day", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/patient/orders/${8574}`)
    .set("Cookie", adminCookie)
    .send()
    .expect(200);
});

it("update order - change entree", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/patient/order`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("delete order - patient unauthorized returns 401", async () => {
  const patientCookie = global.patientsignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", patientCookie)
    .send({})
    .expect(200);
});

it("delete order - provider authorized", async () => {
  const providerCookie = global.providersignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", providerCookie)
    .send({})
    .expect(200);
});

it("delete order - admin authorized", async () => {
  const adminCookie = global.adminsignin();

  const response = await request(app)
    .post(`/api/order/delete-order`)
    .set("Cookie", adminCookie)
    .send({})
    .expect(200);
});
