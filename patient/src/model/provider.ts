import mongoose from "mongoose";
import { Patient, patientSchema } from "./patient";

interface ProviderAttributes {
  providerId: string;
  patients: Array<typeof Patient>;
}

interface ProviderDoc extends mongoose.Document {
  providerId: string;
}

interface ProviderModel extends mongoose.Model<ProviderDoc> {
  build(attributes: ProviderAttributes): ProviderDoc;
}

const providerSchema = new mongoose.Schema(
  {
    providerId: {
      type: String,
      required: true,
    },
    patients: [patientSchema],
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

providerSchema.statics.build = (attributes: ProviderAttributes) => {
  return new Provider(attributes);
};

const Provider = mongoose.model<ProviderDoc, ProviderModel>(
  "Provider",
  providerSchema
);

export { Provider };
