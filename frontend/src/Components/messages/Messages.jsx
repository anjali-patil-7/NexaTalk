import { useEffect, useRef } from "react";
import { TiMessages } from "react-icons/ti";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='flex-1 overflow-y-auto px-4 py-4'>
			{/* Loading skeletons */}
			{loading && (
				<div className='flex flex-col gap-1'>
					{[...Array(5)].map((_, idx) => (
						<MessageSkeleton key={idx} fromMe={idx % 2 === 0} />
					))}
				</div>
			)}

			{/* Messages */}
			{!loading && messages.length > 0 && (
				<div className='flex flex-col gap-1'>
					{messages.map((message, idx) => (
						<div
							key={message._id}
							ref={idx === messages.length - 1 ? lastMessageRef : null}
						>
							<Message message={message} />
						</div>
					))}
				</div>
			)}

			{/* Empty state */}
			{!loading && messages.length === 0 && (
				<div className='flex flex-col items-center justify-center h-full gap-3'>
					<div className='w-12 h-12 rounded-2xl bg-[#1c2333] flex items-center justify-center'>
						<TiMessages className='w-6 h-6 text-[#484f58]' />
					</div>
					<p className='text-sm text-[#8b949e]'>No messages yet — say hello! 👋</p>
				</div>
			)}
		</div>
	);
};

export default Messages;