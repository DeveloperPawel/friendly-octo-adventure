import mongoose from "mongoose";
import { app } from "./app";
import { OrderCreatedListener } from "./events/listeners/order/order-created-listener";
import { OrderDeletedListener } from "./events/listeners/order/order-deleted-listener";
import { OrderUpdatedListener } from "./events/listeners/order/order-updated-listener";
import { PatientCreatedListener } from "./events/listeners/patient/patient-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("mongo uri must be set");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("nats cluster id must be set");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("nats client id must be set");
  }

  if (!process.env.NATS_URL) {
    throw new Error("nats url must be set");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderDeletedListener(natsWrapper.client).listen();
    new OrderUpdatedListener(natsWrapper.client).listen();
    new PatientCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Admin connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Admin on port 3000!");
  });
};

start();
