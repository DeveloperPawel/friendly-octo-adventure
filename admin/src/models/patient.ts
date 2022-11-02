import mongoose from "mongoose";
import { OrderDoc } from "./order";
import { PreferenceDoc } from "./preference";
import { RestrictionDoc } from "./restriction";

interface PatientAttributes {
  patientId: string;
  orders?: Array<OrderDoc>;
}

export interface PatientDoc extends mongoose.Document {
  patientId: string;
  orders?: Array<OrderDoc>;
  providerId?: string;
  preferences?: Array<PreferenceDoc>;
  restrictions?: Array<RestrictionDoc>;
}

interface PatientModel extends mongoose.Model<PatientDoc> {
  build(attributes: PatientAttributes): PatientDoc;
}

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    providerId: {
      type: String,
      required: false,
    },
    preferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preference",
      },
    ],
    restrictions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restriction",
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

patientSchema.statics.build = (attributes: PatientAttributes) => {
  return new Patient(attributes);
};

const Patient = mongoose.model<PatientDoc, PatientModel>(
  "Patient",
  patientSchema
);

export { Patient };
