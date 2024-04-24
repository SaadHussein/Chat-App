import { useEffect, useState } from "react";
import useUserrnameHook from "./hooks/usernameHook";
import "./App.css";
import SendMessages from "./components/SendMessages";
import Messages from "./components/Messages";
import useSocketHook from "./hooks/socketHook";
import NewChat from "./components/NewChat";
import useChatIdHook from "./hooks/chatIdHook";

function App() {
	const [messages, setMessages] = useState([]);
	const sender = useUserrnameHook();
	const chatId = useChatIdHook();
	const socket = useSocketHook({ chatId });

	useEffect(() => {
		if (socket !== null) {
			socket.on("message", (message) => {
				setMessages([...messages, message]);
			});
		}
	}, [socket, messages, setMessages]);

	return (
		<div className="App">
			<div className="grid grid-cols-1">
				<div className="">
					<NewChat />
				</div>
				<div className="mt-10 overflow-y-auto max-h-[70vh]">
					<Messages messages={messages} />
				</div>
				<div className="mt-10 grid grid-cols-2 absolute bottom-0 left-0 right-0 p-3">
					<SendMessages
						socket={socket}
						chatId={chatId}
						messages={messages}
						sender={sender}
						setMessages={setMessages}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
