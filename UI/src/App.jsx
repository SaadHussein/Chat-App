import { useState } from "react";
import useUserrnameHook from "./hooks/usernameHook";
import "./App.css";
import SendMessages from "./components/SendMessages";
import Messages from "./components/Messages";

function App() {
	const sender = useUserrnameHook();
	const [messages, setMessages] = useState([]);

	return (
		<div className="App">
			<div className="grid grid-cols-1">
				<div className="mt-10 overflow-y-auto max-h-[70vh]">
					<Messages messages={messages} />
				</div>
				<div className="mt-10 grid grid-cols-2 absolute bottom-0 left-0 right-0 p-3">
					<SendMessages
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
