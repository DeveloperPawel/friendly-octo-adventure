import {
  Listener,
  PreferenceCreatedEvent,
  Subjects,
  UserType,
} from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Preference } from "../../../models/preference";
import { queueGroupName } from "../queue-group-name";

export class PreferenceCreatedListener extends Listener<PreferenceCreatedEvent> {
  subject: Subjects.PreferenceCreated = Subjects.PreferenceCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: PreferenceCreatedEvent[`data`], message: Message) {
    const preference = Preference.build({
      preferenceId: data.preferenceId,
      value: data.value,
      userType: data.userType,
    });
    await preference.save();
    message.ack();
  }
}
