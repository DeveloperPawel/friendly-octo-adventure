import {
  BadRequestError,
  Listener,
  NotFoundError,
  PatientDeletedEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { User } from "../../../models/user";
import { queueGroupName } from "../queue-group-name";

export class PatientDeletedListener extends Listener<PatientDeletedEvent> {
  subject: Subjects.PatientDeleted = Subjects.PatientDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: PatientDeletedEvent[`data`], message: Message) {
    await User.deleteOne({ id: data.id }, (err: any, d: any) => {
      if (err) throw new BadRequestError();
      if (d.acknowledged && d.deletedCount == 1) {
        message.ack();
      } else {
        throw new NotFoundError();
      }
    });
  }
}
