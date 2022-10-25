import {
  BadRequestError,
  DayDeletedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Day } from "../../../models/day";
import { queueGroupName } from "../queue-group-name";

export class DayDeletedListener extends Listener<DayDeletedEvent> {
  subject: Subjects.DayDeleted = Subjects.DayDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: DayDeletedEvent[`data`], message: Message) {
    await Day.deleteOne({ dayId: data.dayId }, (err: any, doc: any) => {
      if (err) throw new BadRequestError();
      if (doc.acknowledged && doc.deletedCount == 1) {
        message.ack();
      } else {
        throw new NotFoundError();
      }
    }).clone();
  }
}
