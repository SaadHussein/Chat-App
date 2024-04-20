import { useEffect, useState } from "react";

export default function useUserrnameHook() {
    const [sender, setSender] = useState("Saad");
    useEffect(() => {
        const senderInput = prompt("Please Enter Your Name:", "User");
        setSender(senderInput);
    }, []);

    return sender;
}