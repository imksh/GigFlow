import Gig from "../models/gig.model.js";
import Bid from "../models/bid.model.js";
import { mongoose } from "mongoose";

export const addBid = async (req, res, next) => {
  try {
    const { gig, message, price } = req.body;
    if (!gig || !message || !price) {
      return next({ status: 400, message: "All fields are required" });
    }
    const bid = await Bid.findOne({ freelancer: req.user._id, gig });
    if (bid) {
      return next({
        status: 409,
        message: "Bid Already Submitted",
      });
    }
    const newBid = await Bid.create({
      gig,
      freelancer: req.user._id,
      message,
      price,
      status: "pending",
    });
    res.status(201).json(newBid);
  } catch (error) {
    console.log("Error in getBid : ", error);
    next(error);
  }
};

export const getBids = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bids = await Bid.find({ gig: id })
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(bids);
  } catch (error) {
    console.log("Error in getBid : ", error);
    next(error);
  }
};

export const myBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({ freelancer: req.user._id })
      .populate("gig", "title budget status")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    console.log("Error in myBids:", error);
    next(error);
  }
};

export const hire = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.id).session(session);
    if (!bid) {
      return next({ status: 404, message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gig).session(session);
    if (!gig) {
      return next({ status: 404, message: "Gig not found" });
    }

    if (gig.status === "assigned") {
      return next({ status: 409, message: "Gig already assigned" });
    }

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gig: bid.gig, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(bid);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
