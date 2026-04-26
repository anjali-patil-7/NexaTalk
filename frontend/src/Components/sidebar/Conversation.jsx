import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../Zustand/useConversation";

const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<div
			onClick={() => setSelectedConversation(conversation)}
			className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150 border-l-2
				${
					isSelected
						? "bg-indigo-500/10 border-l-indigo-500"
						: "hover:bg-[#1c2333] border-l-transparent"
				}`}
		>
			{/* Avatar with online dot */}
			<div className='relative flex-shrink-0'>
				<img
					src={conversation.profilePic}
					alt={conversation.fullName}
					className='w-11 h-11 rounded-full object-cover'
				/>
				{isOnline && (
					<span className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#161b22]' />
				)}
			</div>

			{/* Info */}
			<div className='flex-1 min-w-0'>
				<div className='flex items-center justify-between mb-0.5'>
					<p
						className={`text-sm font-semibold truncate ${
							isSelected ? "text-white" : "text-[#e6edf3]"
						}`}
					>
						{conversation.fullName}
					</p>
					{isOnline && (
						<span className='text-[10px] text-emerald-400 font-medium flex-shrink-0 ml-1'>
							Online
						</span>
					)}
				</div>
				<p className='text-xs text-[#8b949e] truncate'>
					Click to start chatting...
				</p>
			</div>
		</div>
	);
};

export default Conversation;