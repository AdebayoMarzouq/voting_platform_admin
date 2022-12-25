import React from "react";
import { deleteCandidate } from "../Backend";

function CandidateLayout({ candidate }) {
	const {
		candidate_department,
		candidate_level,
		candidate_name,
		picture,
		candidate_id,
		votes,
	} = candidate;
	const handleCandidateDelete = async () => {
		if (
			window.confirm(
				`Are you sure you want to delete ${candidate_name}?`
			)
		) {
			const res = await deleteCandidate({
				candidateId: candidate_id,
			});
			if (res.status === 200) {
				window.location.reload();
			}
		}
	};
	return (
		<div className='flex items-center w-full px-2 gap-x-4 md:px-4'>
			<img
				className='object-cover w-24 h-24 border rounded-full shadow shrink-0'
				src={
					picture?.startsWith("http")
						? picture
						: "/pfp.svg"
				}
				alt='profile'
			/>
			<div className='flex flex-col items-start justify-center flex-grow'>
				<h5 className='mb-1 text-xl font-medium text-light-text-primary'>
					{candidate_name ||
						"No candidate name available"}
				</h5>
				<span className='text-sm text-light-text-muted'>
					{candidate_department}
				</span>
				<span className='text-sm text-light-text-muted'>
					{candidate_level + " "}level
				</span>
			</div>
			<div className='flex flex-col gap-1 ml-auto'>
				<div className='text-center text-light-text-muted'>
					<span className='font-semibold'>
						Votes:
					</span>
					<span className='ml-2 text-lg font-bold'>
						{votes}
					</span>
				</div>
				<button
					className={`inline-flex items-center px-2.5 py-1 text-sm font-medium text-center text-light-text-primary border hover:bg-red-600 hover:border-red-600 hover:text-white border-gray-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-200 tracking`}
					onClick={handleCandidateDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default CandidateLayout;
