const ChatOptions = ({ chatId, socket }) => {
	const makePrivate = () => {
		const token = localStorage.getItem("token");
		socket.emit("makePrivate", { chatId, token });
	};

	const inviteUser = () => {
		const token = localStorage.getItem("token");
		const invitedUser = prompt(
			"Please enter the email for user you want to invite."
		);
		socket.emit("inviteUsers", { chatId, token, invitedUser });
	};

	return (
		<>
			<button
				onClick={makePrivate}
				className="bg-indigo-500 text-sm text-white px-3 rounded-md ml-2"
			>
				Make Private
			</button>
			<button
				onClick={inviteUser}
				className="bg-indigo-900 text-sm text-white px-3 rounded-md ml-2"
			>
				Invite Users
			</button>
		</>
	);
};

export default ChatOptions;
