import { UserType } from "../../../common/src/types/UserTypes";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import db from "./config/database";

declare global {
  var adminsignin: () => string[];
  var providersignin: () => string[];
}

beforeAll(async () => await db.connect());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

global.providersignin = () => {
  const userData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    role: UserType.Provider,
  };

  const token = jwt.sign(userData, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};

global.adminsignin = () => {
  const userData = {
    id: new mongoose.Types.ObjectId().toHexString(),
    role: UserType.Provider,
  };

  const token = jwt.sign(userData, "jwt_key");

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
