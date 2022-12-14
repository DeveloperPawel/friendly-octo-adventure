import { Event } from "./base-event";
import { Stan } from "node-nats-streaming";

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        console.log(`Event published: ${this.subject}`);

        resolve();
      });
    });
  }
}
