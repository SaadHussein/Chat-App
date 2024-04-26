const SendMessages = ({ socket, sender, messages, setMessages, chatId }) => {
	const sendMessage = () => {
		const message = document.getElementById("new-message").value;
		if (message && message.length > 0) {
			document.getElementById("new-message").value = "";
			const newMessage = {
				id: messages.length + 1,
				text: message,
				sender,
				chatId,
				timestamp: new Date().getTime(),
			};

			const token = localStorage.getItem("token");
			socket.emit("message", { message: newMessage, token });
			setMessages([...messages, newMessage]);
		}
	};

	return (
		<>
			<footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
				<div className="flex items-center">
					<textarea
						type="text"
						id="new-message"
						placeholder="Type a message..."
						className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
					></textarea>
					<button
						onClick={sendMessage}
						id="send-message"
						className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
					>
						Send
					</button>
				</div>
			</footer>
		</>
	);
};

export default SendMessages;
