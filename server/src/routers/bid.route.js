import express from "express";
import protectedRoute from "../middlewares/protectedRoutes.js";
import {
  myBids,
  getBids,
  addBid,
  hire,
} from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/add", protectedRoute, addBid);
router.get("/my-bids", protectedRoute, myBids);
router.patch("/:id", protectedRoute, hire);
router.get("/:id", protectedRoute, getBids);

export default router;
