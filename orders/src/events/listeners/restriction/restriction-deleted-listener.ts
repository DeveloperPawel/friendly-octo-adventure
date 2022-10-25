import {
  BadRequestError,
  Listener,
  NotFoundError,
  RestrictionDeletedEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Restriction } from "../../../models/restriction";
import { queueGroupName } from "../queue-group-name";

export class RestrictionDeletedListener extends Listener<RestrictionDeletedEvent> {
  subject: Subjects.RestrictionDeleted = Subjects.RestrictionDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: RestrictionDeletedEvent[`data`], message: Message) {
    await Restriction.deleteOne(
      { restrictionId: data.restrictionId },
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
