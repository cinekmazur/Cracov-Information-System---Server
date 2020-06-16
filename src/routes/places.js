import { Router } from "express";
import { catchAsync } from "../middlewares/errors";
import placeController from "../controller/placeController";
import jwtAuth from "../middlewares/auth";

export default () => {
  const api = Router();

  api.get("/explore", placeController.explore);
  api.get("/restaurants", placeController.restaurants);
  api.get("/pubs", placeController.pubs);
  api.get("/explore/:place", placeController.exploreOne);
  api.put("/explore/:place/updaterate", jwtAuth, placeController.updateRate);

  return api;
};
