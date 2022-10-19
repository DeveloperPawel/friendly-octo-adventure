import mongoose from "mongoose";

interface OrderAttributes {
  entreeId: string;
  patientId: string;
}

export interface OrderDoc extends mongoose.Document {
  entreeId: string;
  patientId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attributes: OrderAttributes): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    entreeId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
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
  return new Order(attributes);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
