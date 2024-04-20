import { useState } from "react";
import "./App.css";

function App() {
	const [messages, setMessages] = useState([
		{
			text: "Hello World.",
			sender: "Saad",
			timestamp: new Date().getTime(),
		},
	]);
	return (
		<div className="App">
			<div className="grid grid-cols-1">
				<div className="mt-10"></div>
				<div className="mt-10 grid grid-cols-2 absolute bottom-0 left-0 right-0 p-3">
					<textarea
						className="border-2 border-black"
						id="new-message"
					></textarea>
					<button id="send-message" className="justify-self-end max-w-11">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
