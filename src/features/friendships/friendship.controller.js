import { FriendshipRepository } from "./friendship.repository.js";
import { UserRepository } from "../users/user.repository.js";
const friendshipRepo = new FriendshipRepository();
const userRepo = new UserRepository();
export const getFriends = async (req, res, next) => {
  try {
    const friends = await friendshipRepo.getFriends(req.userID);
    if (friends) {
      res.status(200).send({ success: false, message: friends });
    } else {
      res.status(404).send({ success: false, message: "No friends found." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send({ success: false, message: "Error: unable to get friends" });
  }
};

export const getPendingRequests = async (req, res, next) => {
  try {
    const pendingRequests = await friendshipRepo.getPendingRequests(req.userID);
    if (pendingRequests) {
      res.status(200).send({ success: false, message: pendingRequests });
    } else {
      res
        .status(404)
        .send({ success: false, message: "No pending requests found." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send({ success: false, message: "Error: unable to get friends" });
  }
};

export const toggleFriendship = async (req, res, next) => {
  try {
    const { friendId } = req.params;

    const friend = await userRepo.getDetails(friendId);

    if (friend) {
      const result = await friendshipRepo.toggleFriendship(
        req.userID,
        friendId
      );
      if (result) {
        if (result.success) {
          res.status(200).send(result);
        } else {
          res.status(400).send(result);
        }
      } else {
        res.status(400).send("Unable to toggle frendship");
      }
    } else {
      res.status(404).send({
        success: false,
        message: "No User found with the specified ID",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ success: false, message: "Error toggling friendship status." });
  }
};

export const respondToFriendRequest = async (req, res, next) => {
  try {
    const { friendId } = req.params;

    const friend = await userRepo.getDetails(friendId);
    if (friend) {
      const result = await friendshipRepo.respondToFriendRequest(
        req.userID,
        friendId
      );
      if (result) {
        if (result.success) {
          res.status(200).send(result);
        } else {
          res.status(404).send(result);
        }
      } else {
        res.status(400).send({
          success: false,
          message: "unable to accept/reject friend request",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "No User found with the specified ID",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ success: false, message: "Error responding to friend request." });
  }
};
