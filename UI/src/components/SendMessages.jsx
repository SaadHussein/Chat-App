const SendMessages = ({ sender, messages, setMessages }) => {
	const sendMessage = () => {
		const message = document.getElementById("new-message").value;
		if (message && message.length > 0) {
			document.getElementById("new-message").value = "";
			const newMessage = {
				id: messages.length + 1,
				text: message,
				sender,
				timestamp: new Date().getTime(),
			};

			setMessages([...messages, newMessage]);
		}
	};

	return (
		<>
			<textarea className="border-2 border-black" id="new-message"></textarea>
			<button
				id="send-message"
				className="justify-self-end max-w-11"
				onClick={sendMessage}
			>
				Send
			</button>
		</>
	);
};

export default SendMessages;
