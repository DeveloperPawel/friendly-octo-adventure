import { rest } from "msw";

export const handlers = [
  rest.get(`/api/order/patient/:patientId`, (req, res, ctx) => {
    return res(
      ctx.json({
        patientId: "234n4l345n324ln54",
        orders: [
          {
            breakfast: {
              entreeId: "234n4l345n324ln54",
              name: "eggs",
              foodItems: [
                {
                  foodItemId: "asdfasdfasdf",
                  name: "egg",
                  ingredients: [
                    {
                      ingredientId: "asasdflientient",
                      name: "egg",
                    },
                  ],
                },
              ],
            },
            lunch: {
              entreeId: "234uuuun4l345n324ln54",
              name: "sandwich",
              foodItems: [
                {
                  foodItemId: "asdfasdfasdf",
                  name: "egg",
                  ingredients: [
                    {
                      ingredientId: "asasdflientient",
                      name: "egg",
                    },
                  ],
                },
              ],
            },
            dinner: {
              entreeId: "234n4l345n324lng54",
              name: "steak and eggs",
              foodItems: [
                {
                  foodItemId: "asdfasdfasdf",
                  name: "egg",
                  ingredients: [
                    {
                      ingredientId: "asasdflientient",
                      name: "egg",
                    },
                  ],
                },
                {
                  foodItemId: "aggsdfasdfasdf",
                  name: "steak",
                  ingredients: [
                    {
                      ingredientId: "asasdflggientient",
                      name: "beef",
                    },
                  ],
                },
              ],
            },
            patinetId: "234n4l345n324ln54",
            orderId: "asdflasdkfnurngjd",
            date: new Date(),
          },
        ],
        preferences: [
          {
            preferenceId: "asdflweignirn5",
            name: "dairy",
            userType: "patient",
          },
          {
            preferenceId: "asdflwe4543ignirn5",
            name: "lettuce",
            userType: "provider",
          },
        ],
        restrictions: [
          {
            restrictionId: "as7df8asdf8asd9fw",
            type: "mech soft",
          },
        ],
      })
    );
  }),
  rest.get(`/api/order/day/:date`, (req, res, ctx) => {
    return res(
      ctx.json({
        date: new Date(),
        dayId: "q24j35oi356ouh3o4ih534ll",
        breakfast: [
          {
            entreeId: "234n4l345n324ln54",
            name: "eggs",
            foodItems: [
              {
                foodItemId: "asdfasdfasdf",
                name: "egg",
                ingredients: [
                  {
                    ingredientId: "asasdflientient",
                    name: "egg",
                  },
                ],
              },
            ],
          },
          {
            entreeId: "234n4l345n8888324ln54",
            name: "bread",
            foodItems: [
              {
                foodItemId: "asdfasdf9asdf",
                name: "bread",
                ingredients: [
                  {
                    ingredientId: "asasdfli9999entient",
                    name: "bread",
                  },
                ],
              },
            ],
          },
        ],
        lunch: [
          {
            entreeId: "234uuuun4l345n324ln54",
            name: "sandwich",
            foodItems: [
              {
                foodItemId: "asdfasdfasdf",
                name: "egg",
                ingredients: [
                  {
                    ingredientId: "asasdflientient",
                    name: "egg",
                  },
                ],
              },
            ],
          },
          {
            entreeId: "234n4l345n8888324ln54",
            name: "bread",
            foodItems: [
              {
                foodItemId: "asdfasdf9asdf",
                name: "bread",
                ingredients: [
                  {
                    ingredientId: "asasdfli9999entient",
                    name: "bread",
                  },
                ],
              },
            ],
          },
        ],
        dinner: [
          {
            entreeId: "234n4l345n324lng54",
            name: "steak and eggs",
            foodItems: [
              {
                foodItemId: "asdfasdfasdf",
                name: "egg",
                ingredients: [
                  {
                    ingredientId: "asasdflientient",
                    name: "egg",
                  },
                ],
              },
              {
                foodItemId: "aggsdfasdfasdf",
                name: "steak",
                ingredients: [
                  {
                    ingredientId: "asasdflggientient",
                    name: "beef",
                  },
                ],
              },
            ],
          },
          {
            entreeId: "234n4l345n8888324ln54",
            name: "bread",
            foodItems: [
              {
                foodItemId: "asdfasdf9asdf",
                name: "bread",
                ingredients: [
                  {
                    ingredientId: "asasdfli9999entient",
                    name: "bread",
                  },
                ],
              },
            ],
          },
        ],
      })
    );
  }),
  rest.post(`/api/order/create-order`, (req, res, ctx) => {
    return res(
      ctx.json({
        date: new Date(),
        patientId: "asdf394h5jfri4gfi",
        orderId: "q24j35oi356ouh3o4ih",
        breakfast: "234n4l345n324ln54",
        lunch: null,
        dinner: null,
      })
    );
  }),
  rest.post(`/api/order/patient/order`, (req, res, ctx) => {
    return res(
      ctx.json({
        date: new Date(),
        patientId: "asdf394h5jfri4gfi",
        orderId: "q24j35oi356ouh3o4ih",
        breakfast: "234n4l345n324ln54",
        lunch: "234uuuun4l345n324ln54",
        dinner: null,
      })
    );
  }),
];
