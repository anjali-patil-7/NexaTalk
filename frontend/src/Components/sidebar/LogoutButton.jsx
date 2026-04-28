import { BiLogOut } from "react-icons/bi";
import useLogout from "../../Hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button
			onClick={logout}
			disabled={loading}
			title='Sign out'
			className='flex items-center justify-center w-8 h-8 rounded-full text-[#8b949e]
                 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50
                 transition-all duration-150 flex-shrink-0'
		>
			{loading ? (
				<span className='loading loading-spinner w-4 h-4' />
			) : (
				<BiLogOut className='w-5 h-5' />
			)}
		</button>
	);
};

export default LogoutButton;