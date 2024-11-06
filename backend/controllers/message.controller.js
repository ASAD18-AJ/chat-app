import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants : { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // SOCKET.IO FUNCTIONALITY WILL GO HERE
        
        // await conversation.save();
        // await newMessage.save();


        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessage = async (req,res) => {
    try {
        const {id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate('messages'); //populate will get the message object from the message collection(Not reference but actual message)

        if(!conversation) return res.status(200).json([])

        const message = conversation.messages;
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessage controller:", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}