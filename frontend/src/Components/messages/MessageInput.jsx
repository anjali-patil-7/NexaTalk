import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			handleSubmit(e);
		}
	};

	return (
		<div className='flex-shrink-0 px-4 py-3 bg-[#161b22] border-t border-[#30363d]'>
			<form onSubmit={handleSubmit} className='flex items-center gap-2'>
				{/* Emoji button (UI only) */}
				<button
					type='button'
					title='Emoji'
					className='flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full
                     text-[#8b949e] hover:text-indigo-400 hover:bg-indigo-500/10
                     transition-all duration-150'
				>
					<BsEmojiSmile className='w-5 h-5' />
				</button>

				{/* Text input */}
				<input
					type='text'
					placeholder='Type a message...'
					className='flex-1 bg-[#0d1117] border border-[#30363d] text-sm
                     text-[#e6edf3] placeholder-[#484f58] rounded-full
                     py-2.5 px-4 focus:outline-none focus:border-indigo-500/70
                     focus:ring-1 focus:ring-indigo-500/20 transition-all duration-150'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					autoComplete='off'
				/>

				{/* Send button */}
				<button
					type='submit'
					disabled={loading || !message.trim()}
					className='flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full
                     bg-indigo-600 text-white hover:bg-indigo-500
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150 active:scale-95'
				>
					{loading ? (
						<span className='loading loading-spinner w-4 h-4' />
					) : (
						<BsSend className='w-4 h-4' />
					)}
				</button>
			</form>
		</div>
	);
};

export default MessageInput;