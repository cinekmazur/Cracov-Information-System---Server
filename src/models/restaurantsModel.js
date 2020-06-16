import mongoose from "mongoose";

const Restaurants = mongoose.Schema({
  restaurantName: String,
  address: String,
  image: String,
});

export default mongoose.model("Restaurants", Restaurants);
