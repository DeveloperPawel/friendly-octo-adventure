import mongoose from "mongoose";

// patient attributes
interface PatientAttributes {
  patientId: string;
  discharge: Date;
  providerId?: string;
}

export interface PatientDoc extends mongoose.Document {
  patientId: string;
  discharge: Date;
  providerId?: string;
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
    discharge: {
      type: mongoose.Schema.Types.Date,
    },
    providerId: {
      type: String,
      required: false,
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

patientSchema.statics.build = (attributes: PatientAttributes) => {
  return new Patient(attributes);
};

const Patient = mongoose.model<PatientDoc, PatientModel>(
  "Patient",
  patientSchema
);

export { Patient, patientSchema };
