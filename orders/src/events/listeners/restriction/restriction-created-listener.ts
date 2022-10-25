import { Listener, RestrictionCreatedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Restriction } from "../../../models/restriction";
import { queueGroupName } from "../queue-group-name";

export class RestrictionCreatedListener extends Listener<RestrictionCreatedEvent> {
  subject: Subjects.RestrictionCreated = Subjects.RestrictionCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: RestrictionCreatedEvent[`data`], message: Message) {
    const restriction = Restriction.build({
      restrictionId: data.restrictionId,
      type: data.type,
    });

    await restriction.save();
    message.ack();
  }
}
