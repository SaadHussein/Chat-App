import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocketHook({ chatId }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("/", { query: { chatId } }));
    }, [chatId]);

    return socket;
}