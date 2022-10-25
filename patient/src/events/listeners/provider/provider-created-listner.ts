import { Listener, ProviderCreatedEvent, Subjects } from "@mimenu/common";
import { Message } from "node-nats-streaming";
import { Provider } from "../../../model/provider";
import { queueGroupName } from "../../queue-group-name";

export class ProviderCreatedListener extends Listener<ProviderCreatedEvent> {
  subject: Subjects.ProviderCreated = Subjects.ProviderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: ProviderCreatedEvent[`data`], message: Message) {
    const provider = Provider.build({
      providerId: data.id,
    });
    await provider.save();

    message.ack();
  }
}
