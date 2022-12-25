import React from "react";
import { deletePosition } from "../Backend";
import CandidateLayout from "./candidateCard";

function PositionLayout({ position, candidates }) {
	let positionCandidates = candidates
		.filter((candidate) => {
			if (
				candidate.running_position ===
				position.position_id
			) {
				return candidate;
			}
            return false
		})
		.map((candidate) => (
			<CandidateLayout
				key={candidate.candidate_id}
				candidate={candidate}
			/>
		));

	const handlePositionDelete = async () => {
		if (
			window.confirm(
				`Are you sure you want to delete ${position.position_name}?`
			)
		) {
			console.log(position);
			const res = await deletePosition({
				positionId: position.position_id,
			});
			if (res.status === 200) {
				window.location.reload();
			}
		}
	};

	return (
		<div className='flex flex-col'>
			<div className='relative px-2 py-4 bg-gray-100 md:px-4'>
				<h2 className='text-2xl text-left underline'>
					{position.position_name}
				</h2>
				<button
					className='absolute inline-flex items-center px-2 py-0.5 text-sm font-medium text-center border border-gray-400 rounded-lg transform -translate-y-1/2 right-4 top-1/2 text-light-text-primary hover:bg-red-600 hover:border-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-200 tracking'
					onClick={handlePositionDelete}
				>
					Remove
				</button>
			</div>
			<div
				className={`flex flex-wrap items-center justify-center gap-4 ${
					positionCandidates.length > 0 && "py-4"
				}`}
			>
				{positionCandidates}
			</div>
		</div>
	);
}

export default PositionLayout;
