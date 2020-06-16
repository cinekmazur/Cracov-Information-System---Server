import Place from "../models/placeModel";
import Restaurants from "../models/restaurantsModel";
import Pubs from "../models/pubModel";

export default {
  async explore(req, res, next) {
    const places = await Place.find();

    const result = places.map((place) => ({
      pageName: place.pageName,
      place: place.place,
      address: place.address,
      shortDescription: place.shortDescription,
      image: place.image,
    }));

    return res.status(200).send({
      result,
    });
  },

  async exploreOne(req, res, next) {
    const result = await Place.findOne({
      pageName: req.params.place,
    });
    if (!result) return next();

    return res.status(200).send({
      result,
    });
  },

  async updateRate(req, res, next) {
    const result = await Place.findOne({
      pageName: req.params.place,
    });
    if (!result) return next();
    const prevAveGrade = result.rate.averageGrade;
    const prevNumber = result.rate.numberOfRatings;

    const newAveGrade =
      (prevAveGrade * prevNumber + req.body.newGrade) / (prevNumber + 1);

    result.rate.averageGrade = newAveGrade; //update
    result.rate.numberOfRatings += 1; //update
    await result.save();

    return res.status(200).send({
      newAveGrade,
    });
  },

  async restaurants(req, res, next) {
    const restaurants = await Restaurants.find();
    return res.status(200).send({
      restaurants,
    });
  },

  async pubs(req, res, next) {
    const pubs = await Pubs.find();
    return res.status(200).send({
      pubs,
    });
  },
};
