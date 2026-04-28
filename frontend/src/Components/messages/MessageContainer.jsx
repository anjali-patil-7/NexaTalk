import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../Context/AuthContext";
import { useSocketContext } from "../../Context/SocketContext";
import useConversation from "../../Zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	const isOnline =
		selectedConversation && onlineUsers.includes(selectedConversation._id);

	return (
		<div className='flex flex-col flex-1 h-full overflow-hidden bg-[#0f1117]'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* ── Chat Header ── */}
					<div className='flex items-center gap-3 px-5 py-3 bg-[#161b22] border-b border-[#30363d] flex-shrink-0'>
						<div className='relative flex-shrink-0'>
							<img
								src={selectedConversation.profilePic}
								alt={selectedConversation.fullName}
								className='w-10 h-10 rounded-full object-cover'
							/>
							{isOnline && (
								<span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#161b22]' />
							)}
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-semibold text-[#e6edf3] leading-tight'>
								{selectedConversation.fullName}
							</p>
							<p
								className={`text-xs font-medium leading-tight ${
									isOnline ? "text-emerald-400" : "text-[#8b949e]"
								}`}
							>
								{isOnline ? "Active now" : "Offline"}
							</p>
						</div>
					</div>

					{/* ── Messages ── */}
					<Messages />

					{/* ── Input ── */}
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;

/* ────────────────────────────────────── */

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	const firstName = authUser?.fullName?.split(" ")[0] ?? "there";

	return (
		<div className='flex flex-col items-center justify-center h-full gap-5 select-none'>
			{/* Icon */}
			<div className='w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center ring-1 ring-indigo-500/20'>
				<TiMessages className='w-10 h-10 text-indigo-400' />
			</div>

			{/* Text */}
			<div className='text-center'>
				<h2 className='text-lg font-semibold text-[#e6edf3] mb-1'>
					Welcome back, {firstName} 👋
				</h2>
				<p className='text-sm text-[#8b949e] max-w-xs'>
					Select a conversation from the sidebar to start messaging
				</p>
			</div>

			{/* Animated dots */}
			<div className='flex items-center gap-1.5'>
				<span className='w-2 h-2 rounded-full bg-indigo-500/60 bounce-dot' />
				<span className='w-2 h-2 rounded-full bg-indigo-500/60 bounce-dot' />
				<span className='w-2 h-2 rounded-full bg-indigo-500/60 bounce-dot' />
			</div>
		</div>
	);
};
