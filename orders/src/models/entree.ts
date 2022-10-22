import mongoose from "mongoose";
import { FoodItemDoc } from "./fooditem";

interface EntreeAttributes {
  entreeId: string;
  name: string;
  foodItems: Array<FoodItemDoc>;
}

export interface EntreeDoc extends mongoose.Document {
  entreeId: string;
  name: string;
  foodItems?: Array<FoodItemDoc>;
}

interface EntreeModel extends mongoose.Model<EntreeDoc> {
  build(attributes: EntreeAttributes): EntreeDoc;
}

const entreeSchema = new mongoose.Schema(
  {
    entreeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

entreeSchema.statics.build = (attributes: EntreeAttributes) => {
  return new Entree(attributes);
};

const Entree = mongoose.model<EntreeDoc, EntreeModel>("Entree", entreeSchema);

export { Entree };
