const Messages = ({ messages }) => {
	return (
		<>
			{messages.map((message) => (
				<div key={message.id} className="flex justify-start mb-4">
					{message.sender}
					<div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
						{message.text}
					</div>
					<div className="mt-6 block">
						<small className="text-sm">
							{new Date(message.timestamp).toLocaleTimeString()}
						</small>
					</div>
				</div>
			))}
		</>
	);
};

export default Messages;
