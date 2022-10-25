import {
  BadRequestError,
  Listener,
  NotFoundError,
  PreferenceDeletedEvent,
  Subjects,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Preference } from "../../../models/preference";
import { queueGroupName } from "../queue-group-name";

export class PreferenceDeletedListener extends Listener<PreferenceDeletedEvent> {
  subject: Subjects.PreferenceDeleted = Subjects.PreferenceDeleted;
  queueGroupName: string = queueGroupName;
  async onMessage(data: PreferenceDeletedEvent[`data`], message: Message) {
    await Preference.deleteOne(
      { preferenceId: data.preferenceId },
      (err: any, doc: any) => {
        if (err) throw new BadRequestError();
        if (doc.acknowledged && doc.deletedCount == 1) {
          message.ack();
        } else {
          throw new NotFoundError();
        }
      }
    ).clone();
  }
}
