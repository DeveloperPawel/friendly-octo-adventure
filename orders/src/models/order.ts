import mongoose from "mongoose";
import { formatDateAlpha } from "./day";
import { EntreeDoc } from "./entree";

interface OrderAttributes {
  entree: EntreeDoc;
  date: Date;
  patientId: string;
  orderId?: string;
}

export interface OrderDoc extends mongoose.Document {
  entree: EntreeDoc;
  date: Date;
  patientId: string;
  orderId?: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attributes: OrderAttributes): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    entree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entree",
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
      },
    },
  }
);

orderSchema.statics.build = (attributes: OrderAttributes) => {
  let newAttributes: OrderAttributes = attributes;
  newAttributes.date = new Date(formatDateAlpha(attributes.date));
  return new Order(newAttributes);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
