import mongoose from "mongoose";

interface RestrictionAttributes {
  type: string;
}

export interface RestrictionDoc extends mongoose.Document {
  type: string;
}

interface RestrictionModel extends mongoose.Model<RestrictionDoc> {
  build(attributes: RestrictionAttributes): RestrictionDoc;
}

const restrictionSchema = new mongoose.Schema(
  {
    type: {
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

restrictionSchema.statics.build = (attributes: RestrictionAttributes) => {
  return new Restriction(attributes);
};

const Restriction = mongoose.model<RestrictionDoc, RestrictionModel>(
  "Restriction",
  restrictionSchema
);

export { Restriction };
