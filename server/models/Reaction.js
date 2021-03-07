const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    reactionType: {
      type: String,
      enum: ReactionType,
      default: ReactionType.Like
    },
    owner: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    post: {
      ref: "Post",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
const ReactionType = {
  Like = "Like", 
  Heart = "Heart", 
  Care = "Care", 
  Laugh = "Laugh", 
  Angry = "Angry", 
  Sad = "Sad"
}
module.exports = {Reaction, ReactionType};
