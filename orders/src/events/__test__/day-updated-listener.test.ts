import { DayUpdatedEvent, formatDateAlpha } from "@mimenu/common";
import mongoose from "mongoose";
import { Day } from "../../models/day";
import { FoodItem } from "../../models/fooditem";
import { Ingredient } from "../../models/ingredient";
import { natsWrapper } from "../../nats-wrapper";
import { DayUpdatedListener } from "../listeners/day/day-updated-listener";

const setup = async () => {
  const listener = new DayUpdatedListener(natsWrapper.client);

  const dayId = new mongoose.Types.ObjectId().toHexString();

  const firstDate = formatDateAlpha(new Date());
  const day = Day.build({
    dayId,
    date: new Date(firstDate),
  });
  await day.save();

  const bread = Ingredient.build({
    ingredientId: new mongoose.Types.ObjectId().toHexString(),
    name: "bread",
  });
  await bread.save();

  const foodItemId = new mongoose.Types.ObjectId().toHexString();

  const fooditem = FoodItem.build({
    foodItemId,
    name: "avacado toast",
    ingredients: [bread],
  });
  await fooditem.save();

  const addfoodItem: DayUpdatedEvent[`data`] = {
    dayId,
    breakfast: [foodItemId],
  };

  const secondDate = formatDateAlpha(new Date());

  const changeDate: DayUpdatedEvent[`data`] = {
    dayId,
    date: new Date(secondDate),
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    addfoodItem,
    changeDate,
    message,
    foodItemId,
    day,
    dayId,
    firstDate,
    secondDate,
  };
};

it("adds a foodItem", async () => {
  const {
    listener,
    addfoodItem,
    changeDate,
    message,
    foodItemId,
    day,
    dayId,
    firstDate,
    secondDate,
  } = await setup();

  await listener.onMessage(addfoodItem, message);

  const foundDay = await Day.findOne({ dayId });
  expect(foundDay!.breakfast!.length).toEqual(1);
});

it("acks the message", async () => {
  const { listener, addfoodItem, message, day, dayId } = await setup();
  await listener.onMessage(addfoodItem, message);
  expect(message.ack).toHaveBeenCalled();
});
