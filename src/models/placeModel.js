import mongoose from "mongoose";

const Place = mongoose.Schema({
  pageName: String,
  place: String,
  address: String,
  localisation: [Number, Number],
  rate: {
    averageGrade: Number,
    numberOfRatings: Number,
  },
  shortDescription: String,
  somehistory: String,
  image: String,
});

export default mongoose.model("Place", Place);
