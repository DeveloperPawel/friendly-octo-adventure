import mongoose from "mongoose";
import { EntreeDoc } from "./entree";

interface DayAttributes {
  date: Date;
  dayId: string;
  breakfast?: Array<EntreeDoc>;
  lunch?: Array<EntreeDoc>;
  dinner?: Array<EntreeDoc>;
}

interface DayDoc extends mongoose.Document {
  date: Date;
  dayId: string;
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
    dayId: {
      type: String,
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
  return new Day(attributes);
};

const Day = mongoose.model<DayDoc, DayModel>("Day", daySchema);

export { Day };
