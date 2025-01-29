import { io } from "../../utils/socketIo.js";
import Conversation from "../../models/conversation.model.js";
import User from "../../models/users.model.js";

const chatNamespace = io.of('/api/chat');
const chatContoller = () => {
  chatNamespace.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    
    socket.on("msg", async (data) => {
      data.userId = req.userId;
      if (!Array.isArray(data.recipientId)) {
        console.log("It is not an array");
        
        const isExist = await Conversation.findOne({
          participents: { $all: [data.recipientId, data.userId], $size: 2 },
        });

        if (isExist) {
          console.log("exists");
          await Conversation.updateMany(
            { _id: isExist._id },
            {
              $push: { messages: { senderId: data.userId, message: data.msg } },
            } 
          );
        } else {
          console.log("No, it does not exist");
          const conversation = await Conversation.create({
            participents: [data.userId, data.recipientId],
            messages: { senderId: data.userId, message: data.msg },
          });
          await User.updateMany(
            { _id: { $in: [data.userId, data.recipientId] } },
            { $push: { conversations: conversation._id } }
          );
        }
      } else {
        console.log("it is array");

        const isExist = await Conversation.findOne({
          participents: {
            $all: [data.userId, ...data.recipientId],
            $size: data.recipientId.length + 1,
          },
        }); 

        if (isExist) {
          console.log("exists");
          await Conversation.updateMany(
            { _id: isExist._id },
            {
              $push: { messages: { senderId: data.userId, message: data.msg } },
            }
          );
        } else {
          console.log("No, it does not exist");
          const conversation = await Conversation.create({
            participents: [data.userId, ...data.recipientId],
            messages: { senderId: data.userId, message: data.msg },
          });
          await User.updateMany(
            { _id: { $in: [data.userId, ...data.recipientId] } },
            { $push: { conversations: conversation._id } }
          );
        }
      }

      socket.on("disconnect", () => {});
    });
  });
}

export default chatContoller;
