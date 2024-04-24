import { v4 as uuidv4 } from "uuid";

const NewChat = () => {
	const generateNewChatID = () => {
		const newChatID = uuidv4();
		window.location.href = `/?chatId=${newChatID}`;
	};

	return <button onClick={generateNewChatID}>New Chat</button>;
};

export default NewChat;
