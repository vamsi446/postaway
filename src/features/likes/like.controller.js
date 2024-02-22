import { LikeRepository } from "./like.repository.js";

const likeRepo = new LikeRepository();
export const getLikes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const likes = await likeRepo.getLikes(id);
    if (likes) {
      res.status(200).send({ success: true, message: likes });
    } else {
      res.status(404).send({ success: false, message: "no likes found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, message: e.message });
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const userId = req.userID;
    const id = req.params.id;
    const type = req.query.type;
    if (type == "Comment" || type == "Post") {
      const result = await likeRepo.toggleLike(userId, id, type);

      if (result) {
        if (result.message == "Deleted") {
          if (result.res.deletedCount == 1) {
            res.status(200).send({
              success: true,
              message: `${type} unliked successfully`,
            });
          } else {
            res
              .status(400)
              .send({ success: false, message: `error toggling like` });
          }
        } else if (result.message == "Added") {
          if (result.res.like) {
            res.status(200).send({
              success: true,
              message: `${type} liked successfully`,
            });
          } else {
            res.status(400).send({
              success: false,
              message: `unable to like the ${type}`,
            });
          }
        } else {
          res.status(400).send({
            success: false,
            message: `unable to like the ${type}`,
          });
        }
      }
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Only posts/ comments can be liked" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, message: `error toggling like` });
  }
};
