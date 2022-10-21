import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import CookieSession from "cookie-session";

import { NotFoundError } from "@mimenu/common";
import { errorHandler } from "@mimenu/common";

import { userRouter } from "./routes/user";
import { signupRouter } from "./routes/signup";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { signupAdminRouter } from "./routes/signup-admin";
import { signupProviderRouter } from "./routes/signup-provider";

const app = express();
app.use(json());
app.use(
  CookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(signupProviderRouter);
app.use(signupAdminRouter);
app.use(userRouter);
app.use(signupRouter);
app.use(loginRouter);
app.use(logoutRouter);

app.get("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
