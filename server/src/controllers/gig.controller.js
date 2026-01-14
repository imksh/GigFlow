import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";

export const post = async (req, res, next) => {
  try {
    const { title, desc, budget } = req.body;

    if (!title || !desc || !budget) {
      return next({
        status: 400,
        message: "All fields are required",
      });
    }
    const newGig = await Gig.create({
      title,
      desc,
      budget: Number(budget),
      owner: req.user._id,
      status: "open",
    });
    res.status(201).json(newGig);
  } catch (error) {
    console.log("Error in post gig: ", error);
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { search, min, max } = req.query;

    let filter = { status: "open" };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (min || max) {
      filter.budget = {};
      if (min) filter.budget.$gte = Number(min);
      if (max) filter.budget.$lte = Number(max);
    }

    const gigs = await Gig.find(filter)
      .sort({ createdAt: -1 })
      .populate("owner", "name");

    res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        status: 400,
        message: "Id is required",
      });
    }
    const gig = await Gig.findById(id).populate("owner", "_id name email");
    if (!gig) {
      return next({
        status: 404,
        message: "Gig not found",
      });
    }

    res.status(200).json(gig);
  } catch (error) {
    console.log("Error in get gig: ", error);
    next(error);
  }
};

export const myGigs = async (req, res, next) => {
  try {
    const gigs = await Gig.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    if (gigs.length === 0) {
      return next({
        status: 404,
        message: "Gigs not found",
      });
    }
    res.status(200).json(gigs);
  } catch (error) {
    console.log("Error in myGigs : ", error);
    next(error);
  }
};
