import mongoose from "mongoose";

interface IngredientAttributes {
  name: string;
}

export interface IngredientDoc extends mongoose.Document {
  name: string;
}

interface IngredientModel extends mongoose.Model<IngredientDoc> {
  build(attributes: IngredientAttributes): IngredientDoc;
}

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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

ingredientSchema.statics.build = (attributes: IngredientAttributes) => {
  return new Ingredient(attributes);
};

const Ingredient = mongoose.model<IngredientDoc, IngredientModel>(
  "Ingredient",
  ingredientSchema
);

export { Ingredient };
