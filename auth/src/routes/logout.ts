import express from "express";

const router = express.Router();

router.get("/api/auth/logout", (req, res) => {});

export { router as logoutRouter };
