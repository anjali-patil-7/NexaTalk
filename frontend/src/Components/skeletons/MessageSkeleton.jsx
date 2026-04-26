const MessageSkeleton = ({ fromMe = false }) => {
	return (
		<div
			className={`flex items-end gap-2 mb-3 ${
				fromMe ? "flex-row-reverse" : "flex-row"
			}`}
		>
			{/* Avatar skeleton */}
			<div className='w-7 h-7 rounded-full bg-[#1c2333] animate-pulse flex-shrink-0' />

			{/* Bubble skeleton */}
			<div
				className={`flex flex-col gap-1 ${fromMe ? "items-end" : "items-start"}`}
			>
				<div
					className={`h-10 rounded-2xl bg-[#1c2333] animate-pulse ${
						fromMe ? "rounded-br-sm w-44" : "rounded-bl-sm w-52"
					}`}
				/>
				<div className='h-2 bg-[#1c2333] rounded animate-pulse w-10' />
			</div>
		</div>
	);
};

export default MessageSkeleton;