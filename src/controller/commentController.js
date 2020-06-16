import Comment from "../models/comment";

export default {
  async findPlaceComments(req, res, next) {
    const comment = await Comment.find({
      place: req.params.place,
    }).sort({
      createdAt: "desc",
    });
    if (!comment) return next();

    return res.status(200).send({
      data: comment,
    });
  },

  async findAll(req, res) {
    const comments = await Comment.find().sort({
      createdAt: "desc",
    });
    return res.status(200).send({
      data: comments,
    });
  },

  async create(req, res) {
    const comment = await new Comment({
      place: req.body.place,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      text: req.body.text,
    }).save();

    return res.status(201).send({
      data: comment,
      message: "Comment was added",
    });
  },
  async update(req, res, next) {
    const comment = await Comment.findOne({
      slug: req.params.slug,
    }); //find user in database
    if (!comment) return next();

    comment.title = req.body.title; //update
    await comment.save();

    return res.status(200).send({
      data: comment,
      message: "Succesfully updated.",
    });
  },

  async delete(req, res, next) {
    const comment = await Comment.findOne({
      slug: req.params.slug,
    });
    if (!comment) return next();
    await comment.remove();

    return res.status(200).send({
      message: "Succesfuly deleted",
    });
  },
};
