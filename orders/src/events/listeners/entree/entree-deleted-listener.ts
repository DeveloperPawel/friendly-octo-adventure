import {
  BadRequestError,
  EntreeDeletedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Entree } from "../../../models/entree";
import { queueGroupName } from "../queue-group-name";

export class EntreeDeletedListener extends Listener<EntreeDeletedEvent> {
  subject: Subjects.EntreeDeleted = Subjects.EntreeDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: EntreeDeletedEvent[`data`], message: Message) {
    await Entree.deleteOne(
      { entreeId: data.entreeId },
      (err: any, doc: any) => {
        if (err) throw new BadRequestError();
        if (doc.acknowledged && doc.deletedCount == 1) {
          message.ack();
        } else {
          throw new NotFoundError();
        }
      }
    );
  }
}
