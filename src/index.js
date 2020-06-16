import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import express from "express";
import { join } from "path";
import config from "./config/config";
import comments from "./routes/comments";
import places from "./routes/places";
import users from "./routes/users";
import auth from "./routes/auth";
import passport from "./config/passport";
import { notFound, catchErrors } from "./middlewares/errors";
import bodyParser from "body-parser";

// Connect to database
import dbConfig from "./config/database";
import mongoose from "mongoose";
import cors from "cors";
//gridFS - tool for streming images to browser
var Grid = require("gridfs-stream");

passport();

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

const conn = mongoose.createConnection(dbConfig.mongoUrl);
let gfs;
conn.once("open", () => {
  // init file stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

let app = express();

app.use(cors());
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get("/api/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

//routes config
app.use("/api/auth", auth());
app.use("/api/users", users());
app.use("/api/places", places());
app.use("/api/comments", comments());

// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
  console.log(`Server is up!`);
});
