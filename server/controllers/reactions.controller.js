const Post = require("../models/Post");
const Reaction = require("../models/Reaction");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const reactionsController = {};

reactionsController.create = catchAsync(async (req, res) => {
  console.log(req.body)
  const reaction = await Reaction.create({
    owner: req.userId,
    enum: "Care",
    post: req.body.targetId,
  });
  const post = await Post.findById(req.body.targetId);
  post.reactions.push(reaction._id);

  await post.save();

  res.json(reaction);
});

reactionsController.read = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post)
    return next(new AppError(404, "Post not found", "Get Single Post Error"));

  await post.populate("owner").populate("comments");
  await post.execPopulate();

  res.json(post);
});

module.exports = reactionsController;
