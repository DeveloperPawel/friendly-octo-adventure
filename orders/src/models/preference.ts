import { UserType } from "@mimenu/common";
import mongoose from "mongoose";

interface PreferenceAttributes {
  preferenceId: string;
  value: string;
  userType: UserType;
}

export interface PreferenceDoc extends mongoose.Document {
  preferenceId: string;
  value: string;
  userType: UserType;
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
    value: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: Object.values(UserType),
      default: UserType.Patient,
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
