import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        await C
    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}