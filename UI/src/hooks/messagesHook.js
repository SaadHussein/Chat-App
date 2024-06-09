import { useEffect } from "react";

export default function useMessagesHook({ chatId, socket, setMessages }) {
    useEffect(() => {
        if (socket !== null) {
            const token = localStorage.getItem("token");
            socket.on("getMessages", (messages) => {
                setMessages(messages);
            });
            socket.emit("getMessages", { token, chatId });
        }
    }, [socket]);
}