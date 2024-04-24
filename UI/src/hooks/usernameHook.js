import { useEffect, useState } from "react";

export default function useUserrnameHook() {
    const [sender, setSender] = useState("Saad");
    useEffect(() => {
        const senderName = localStorage.getItem("senderName");
        if (senderName) {
            setSender(senderName);
            return;
        } else {
            const senderInput = prompt("Please Enter Your Name:", "User");
            localStorage.setItem("senderName", senderInput);
            setSender(senderInput);
        }
    }, []);

    return sender;
}