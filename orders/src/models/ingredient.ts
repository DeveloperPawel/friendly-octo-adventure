import mongoose from "mongoose";

interface IngredientAttributes {
  ingredientId: string;
  title: string;
}

export interface IngredientDoc extends mongoose.Document {
  ingredientId: string;
  title: string;
}

interface IngredientModel extends mongoose.Model<IngredientDoc> {
  build(attributes: IngredientAttributes): IngredientDoc;
}

const ingredientSchema = new mongoose.Schema(
  {
    ingredientId: {
      type: String,
      required: true,
    },
    title: {
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
