import mongoose from "mongoose";
import { IngredientDoc } from "./ingredient";

interface PreferenceAttributes {
  preferenceId: string;
  ingredient: IngredientDoc;
  value: string;
}

export interface PreferenceDoc extends mongoose.Document {
  preferenceId: string;
  ingredient?: IngredientDoc;
  value: string;
}

interface PreferenceModel extends mongoose.Model<PreferenceDoc> {
  build(attributes: PreferenceAttributes): PreferenceDoc;
}

const preferenceSchema = new mongoose.Schema(
  {
    preferenceId: {
      type: String,
      required: true,
    },
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
    value: {
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

preferenceSchema.statics.build = (attributes: PreferenceAttributes) => {
  return new Preference(attributes);
};

const Preference = mongoose.model<PreferenceDoc, PreferenceModel>(
  "Preference",
  preferenceSchema
);

export { Preference };
