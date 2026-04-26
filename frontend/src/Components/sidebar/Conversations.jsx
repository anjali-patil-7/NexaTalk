import useGetConversations from "../../Hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className='flex flex-col'>
			{loading ? (
				/* Skeleton loaders */
				[...Array(5)].map((_, idx) => (
					<div key={idx} className='flex items-center gap-3 px-4 py-3'>
						<div className='w-11 h-11 rounded-full bg-[#1c2333] animate-pulse flex-shrink-0' />
						<div className='flex-1 space-y-2'>
							<div className='h-3.5 bg-[#1c2333] rounded animate-pulse w-32' />
							<div className='h-2.5 bg-[#1c2333] rounded animate-pulse w-48' />
						</div>
					</div>
				))
			) : conversations.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
					<p className='text-sm text-[#8b949e]'>No conversations yet</p>
					<p className='text-xs text-[#484f58] mt-1'>Users will appear here</p>
				</div>
			) : (
				conversations.map((conversation) => (
					<Conversation key={conversation._id} conversation={conversation} />
				))
			)}
		</div>
	);
};

export default Conversations;