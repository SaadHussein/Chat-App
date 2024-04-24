import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocketHook() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("/"));
    }, []);

    return socket;
}