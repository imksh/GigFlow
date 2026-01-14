import express from "express";
import protectedRoute from "../middlewares/protectedRoutes.js";
import { post, getAll, getGig, myGigs } from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/", protectedRoute, post);
router.get("/", protectedRoute, getAll);
router.get("/my-gigs", protectedRoute, myGigs);
router.get("/:id", protectedRoute, getGig);

export default router;
