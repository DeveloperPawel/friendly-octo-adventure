import mongoose from "mongoose";
import { app } from "./app";
import { PatientCreatedListener } from "./events/listeners/patient/patient-created-listener";
import { ProviderCreatedListener } from "./events/listeners/provider/provider-created-listner";
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

    new PatientCreatedListener(natsWrapper.client).listen();
    new ProviderCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Patient connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Patient on port 3000!");
  });
};

start();
