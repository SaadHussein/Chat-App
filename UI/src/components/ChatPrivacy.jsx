import useAppStore from "../stores/appStore";

const ChatOptions = ({ chatId, socket }) => {
	const { setModal } = useAppStore();
	const makePrivate = () => {
		const token = localStorage.getItem("token");
		socket.emit("makePrivate", { chatId, token });
	};

	const inviteUser = () => {
		const token = localStorage.getItem("token");
		setModal({
			show: true,
			children: (
				<>
					<label
						htmlFor="invitationMail"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
					>
						Please enter the email for user you want to invite.
					</label>
					<input
						type="text"
						id="invitationMail"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Email"
						required
					/>
				</>
			),
			onClick: () => {
				const userEmail = document.getElementById("invitationMail").value;
				socket.emit("inviteUsers", { chatId, token, invitedUser: userEmail });
				setModal({
					show: false,
				});
			},
		});
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
