import { UserType } from "@mimenu/common";
import mongoose from "mongoose";

interface PreferenceAttributes {
  value: string;
}

export interface PreferenceDoc extends mongoose.Document {
  value: string;
}

interface PreferenceModel extends mongoose.Model<PreferenceDoc> {
  build(attributes: PreferenceAttributes): PreferenceDoc;
}

const preferenceSchema = new mongoose.Schema(
  {
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
