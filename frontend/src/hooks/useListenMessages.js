import { useEffect } from "react";

import { useSocketContext } from '../context/SocketContext'
import useConversation from "../Zustand/useConversation";

import notificationSound from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket?.
    })
}