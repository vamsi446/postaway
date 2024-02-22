import mongoose from "mongoose";
import friendshipSchema from "./friendship.schema.js";

const FriendModel = new mongoose.model("Friend", friendshipSchema);

export class FriendshipRepository {
  getFriends = async (userId) => {
    try {
      const friends = await FriendModel.find({
        user1: userId,
        status: "accepted",
      });
      return friends;
    } catch (err) {
      throw err;
    }
  };

  getPendingRequests = async (userId) => {
    try {
      const friends = await FriendModel.find({
        user1: userId,
        status: "pending",
      });
      return friends;
    } catch (err) {
      throw err;
    }
  };

  toggleFriendship = async (userId, friendId) => {
    try {
      const friendship = await FriendModel.findOne({
        $or: [
          { user1: userId, user2: friendId },
          { user1: friendId, user2: userId },
        ],
      });
      console.log(friendship);
      if (friendship) {
        if (friendship.status == "accepted") {
          return {
            success: false,
            message:
              "Unable to send Friend request as User is already a friend",
          };
        } else if (friendship.status == "pending") {
          return {
            success: false,
            message: "Friend request already sent and waiting for response",
          };
        }
      } else {
        const createFriendship = new FriendModel({
          user1: userId,
          user2: friendId,
          status: "pending",
          createdAt: new Date(),
        });
        await createFriendship.save();
        return {
          success: true,
          message: "Friend request sent successfully",
          request: createFriendship,
        };
      }
    } catch (err) {
      throw err;
    }
  };

  respondToFriendRequest = async (userId, friendId) => {
    try {
      const friendship = await FriendModel.findOne({
        user1: friendId,
        user2: userId,
      });

      if (friendship && friendship.status === "pending") {
        friendship.status = "accepted";
        await friendship.save();
        return {
          success: true,
          message: "friend request accepted successfully",
        };
      } else if (friendship && friendship.status == "accepted") {
        return { success: false, message: "you are already friends" };
      } else {
        return {
          success: false,
          message: "No friend request found to respond",
        };
      }
    } catch (error) {
      throw error;
    }
  };
}
