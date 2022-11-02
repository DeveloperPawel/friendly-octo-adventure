import { formatDateAlpha } from "@mimenu/common";
import mongoose from "mongoose";
import { EntreeDoc } from "./entree";

interface DayAttributes {
  date: Date;
  breakfast?: Array<EntreeDoc>;
  lunch?: Array<EntreeDoc>;
  dinner?: Array<EntreeDoc>;
}

interface DayDoc extends mongoose.Document {
  date: Date;
  breakfast?: Array<EntreeDoc>;
  lunch?: Array<EntreeDoc>;
  dinner?: Array<EntreeDoc>;
}

interface DayModel extends mongoose.Model<DayDoc> {
  build(attributes: DayAttributes): DayDoc;
}

const daySchema = new mongoose.Schema(
  {
    date: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    breakfast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entree",
      },
    ],
    lunch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entree",
      },
    ],
    dinner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entree",
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

daySchema.statics.build = (attributes: DayAttributes) => {
  let newAttributes: DayAttributes = attributes;
  newAttributes.date = new Date(formatDateAlpha(attributes.date));
  return new Day(newAttributes);
};

const Day = mongoose.model<DayDoc, DayModel>("Day", daySchema);

export { Day };
