import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadUsers from "./users/uploadVoters";
import AddPosition from "./positions/position";
import AddCandidate from "./candidates/candidate";
import { getOverview } from "./Backend";
import { setNewTab } from "./Redux/appSlice";
import Overview from "./overview/overview";
import Delete from "./delete";

function App() {
    const dispatch = useDispatch();
    const [menubar, setMenubar] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			await getOverview();
		})();
	}, []);

	const currentTab = useSelector((state) => state.app.currentTab);
	const handleClick = (e) => {
		dispatch(setNewTab(e.target.id));
		setMenubar(false);
	};

	const h3Style = "hover:bg-gray-100 text-xl cursor-pointer py-9";
	const selectedStyle = "bg-gray-300 hover:bg-gray-300";

	return (
		<div className='grid-cols-12 md:grid'>
			<div className='md:hidden flex'>
				<button
					className='border py-2 px-4 w-fit rounded-md my-2 ml-auto mr-4'
					onClick={() => setMenubar(true)}
				>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</button>
			</div>
			<div
				className={`fixed inset-0 z-10 col-span-3 text-center transform md:translate-x-0 border-r-2 overflow-y-auto bg-neutral-50 md:static md:h-screen duration-300 ease-[cubic-bezier(0.55,0.08,0.68,0.53)] ${
					menubar
						? "translate-x-0"
						: "-translate-x-full"
				}`}
			>
				<div className='md:hidden flex'>
					<button
						className='border py-2 px-4 w-fit rounded-md my-2 ml-auto mr-4'
						onClick={() =>
							setMenubar(false)
						}
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
				<h1 className='py-10 text-3xl border-b-4 text-sky-400'>
					Welcome Adedoyin
				</h1>
				<nav className='flex flex-col'>
					<h3
						onClick={handleClick}
						className={`${h3Style} ${
							currentTab ===
								"overview" &&
							selectedStyle
						}`}
						id='overview'
					>
						Overview
					</h3>
					<h3
						onClick={handleClick}
						className={`${h3Style} ${
							currentTab ===
								"position" &&
							selectedStyle
						}`}
						id='position'
					>
						Add Position
					</h3>
					<h3
						onClick={handleClick}
						className={`${h3Style} ${
							currentTab ===
								"candidate" &&
							selectedStyle
						}`}
						id='candidate'
					>
						Add Candidate
					</h3>
					<h3
						onClick={handleClick}
						className={`${h3Style} ${
							currentTab ===
								"upload" &&
							selectedStyle
						}`}
						id='upload'
					>
						Upload Voters
					</h3>
					<h3
						onClick={handleClick}
						className={`${h3Style} ${
							currentTab ===
								"delete" &&
							selectedStyle
						}`}
						id='delete'
					>
						Delete Election
					</h3>
				</nav>
			</div>
			<main className='h-screen col-span-9 overflow-y-auto text-center bg-neutral-50'>
				{currentTab === "overview" && <Overview />}
				{currentTab === "position" && <AddPosition />}
				{currentTab === "candidate" && <AddCandidate />}
				{currentTab === "upload" && <UploadUsers />}
				{currentTab === "delete" && <Delete />}
			</main>
		</div>
	);
}
export default App;
