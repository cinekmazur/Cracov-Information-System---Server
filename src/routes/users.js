import { Router } from "express";
import userController from "../controller/userController";
import { catchAsync } from "../middlewares/errors";
import jwtAuth from "../middlewares/auth";
import passport from "passport";

export default () => {
  const api = Router();

  api.get("/", jwtAuth, catchAsync(userController.displayUsers));

  api.put(
    "/updateuserdata",
    jwtAuth,
    catchAsync(userController.updateUserData)
  );

  api.put(
    "/password",
    passport.authenticate("local", {
      session: false,
    }),
    catchAsync(userController.changePassword)
  );

  return api;
};
