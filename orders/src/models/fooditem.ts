import mongoose from "mongoose";
import { IngredientDoc } from "./ingredient";

interface FoodItemAttributes {
  foodItemId: string;
  name: string;
  ingredients: Array<IngredientDoc>;
}

export interface FoodItemDoc extends mongoose.Document {
  foodItemId: string;
  name: string;
  ingredients?: Array<IngredientDoc>;
}

interface FoodItemModel extends mongoose.Model<FoodItemDoc> {
  build(attributes: FoodItemAttributes): FoodItemDoc;
}

const foodItemSchema = new mongoose.Schema(
  {
    foodItemId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
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

foodItemSchema.statics.build = (attributes: FoodItemAttributes) => {
  return new FoodItem(attributes);
};

const FoodItem = mongoose.model<FoodItemDoc, FoodItemModel>(
  "FoodItem",
  foodItemSchema
);

export { FoodItem };
