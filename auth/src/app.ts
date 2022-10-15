import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "../../common/src/errors/not-found-error";
import { errorHandler } from "../../common/src/middleware/error-handler";

import { userRouter } from "./routes/user";
import { signupRouter } from "./routes/signup";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";

const app = express();
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(userRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(logoutRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
