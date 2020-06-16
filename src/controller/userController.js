import User from "../models/userModel";
import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

export default {
  async displayUsers(req, res, next) {
    let users;
    const firstName = req.query.first_name;
    const lastName = req.query.last_name;
    const email = req.query.email;
    const allUsers = await User.find();
    if (firstName || lastName || email) {
      users = allUsers.filter(function (value) {
        return (
          value.first_name.includes(firstName) &&
          value.last_name.includes(lastName) &&
          value.email.includes(email)
        );
      });
    } else {
      users = allUsers;
    }
    return res.status(200).send({
      users: users,
    });
  },

  async updateUserData(req, res, next) {
    const user = await User.findOne({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });
    if (!user) return next();

    if (req.body.new_first_name) {
      user.first_name = req.body.new_first_name;
    } else if (req.body.new_last_name) {
      user.last_name = req.body.new_last_name;
    } else if (req.body.new_email) {
      user.email = req.body.new_email;
    } else {
      return next();
    }

    await user.save();
    const userNewToken = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    const token = generateAccessToken(userNewToken);

    res.json({
      token,
    });
  },

  async changePassword(req, res, next) {
    User.findOne({ email: req.body.email }).then((user) => {
      user.setPassword(req.body.new_password, (err, user) => {
        if (err) return next(err);
        user.save();
        res
          .status(200)
          .json({
            message:
              "Password changed successfully. For secure resons, after 4 secounds you will be logged out",
          });
      });
    });
  },
};
