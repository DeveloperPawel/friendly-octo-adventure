import express from "express";
import { activeUser } from "../../../common/src/middleware/active-user";

const router = express.Router();

router.get("/api/auth/current", activeUser, (req, res) => {
  res.send({
    user: req.user || null,
  });
});

export { router as userRouter };
