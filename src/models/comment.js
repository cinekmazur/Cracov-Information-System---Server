import mongoose from "mongoose";

const Comment = mongoose.Schema(
  {
    place: {
      type: String,
      unique: true,
      index: true,
    },
    first_name: String,
    last_name: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", Comment);
