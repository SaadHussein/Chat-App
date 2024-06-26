import { useEffect, useState } from "react";
import useUserrnameHook from "./hooks/usernameHook";
import "./App.css";
import SendMessages from "./components/SendMessages";
import Messages from "./components/Messages";
import useSocketHook from "./hooks/socketHook";
import useChatIdHook from "./hooks/chatIdHook";
import useAuthHook from "./hooks/authHook";
import UserLogin from "./components/UserLogin";
import Sidebar from "./components/sidebar";
import ChatOptions from "./components/ChatPrivacy";
import useMessagesHook from "./hooks/messagesHook";
import OurModal from "./components/common/OurModal";
import useAppStore from "./stores/appStore";

function App() {
	const [messages, setMessages] = useState([]);
	const sender = useUserrnameHook();
	const chatId = useChatIdHook();
	const socket = useSocketHook({ chatId });
	useMessagesHook({ chatId, socket, setMessages });
	const { modal, setModal } = useAppStore();
	const { isLoggedIn } = useAuthHook({ socket });

	console.log(isLoggedIn);
	useEffect(() => {
		if (socket !== null) {
			socket.on("message", (message) => {
				setMessages([...messages, message]);
			});
		}
	}, [socket, messages, setMessages]);

	return (
		<>
			{isLoggedIn && (
				<div className="flex h-screen overflow-hidden">
					<Sidebar socket={socket} />
					<div className="flex-1">
						<header className="bg-white p-4 text-gray-700">
							<h1 className="text-2xl font-semibold">
								{chatId} <ChatOptions chatId={chatId} socket={socket} />
							</h1>
						</header>

						{/*  */}
						<Messages messages={messages} />
						<SendMessages
							socket={socket}
							chatId={chatId}
							messages={messages}
							sender={sender}
							setMessages={setMessages}
						/>
					</div>
				</div>
			)}
			{!isLoggedIn && <UserLogin socket={socket} />}

			<OurModal onClick={modal.onClick} show={modal.show}>
				{modal.children}
			</OurModal>
		</>
	);
}

export default App;
