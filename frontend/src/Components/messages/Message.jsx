import { useAuthContext } from "../../Context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../Zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div
			className={`flex items-end gap-2 mb-2 msg-fade-in ${
				fromMe ? "flex-row-reverse" : "flex-row"
			}`}
		>
			{/* Avatar */}
			<img
				src={profilePic}
				alt='avatar'
				className='w-7 h-7 rounded-full object-cover flex-shrink-0 mb-0.5'
			/>

			{/* Bubble + timestamp */}
			<div
				className={`flex flex-col gap-0.5 max-w-[65%] ${
					fromMe ? "items-end" : "items-start"
				}`}
			>
				<div
					className={`px-4 py-2.5 text-sm leading-relaxed break-words rounded-2xl ${shakeClass} ${
						fromMe
							? "bg-indigo-600 text-white rounded-br-sm"
							: "bg-[#1e2438] text-[#e6edf3] rounded-bl-sm"
					}`}
				>
					{message.message}
				</div>
				<span className='text-[10px] text-[#484f58] px-1'>{formattedTime}</span>
			</div>
		</div>
	);
};

export default Message;