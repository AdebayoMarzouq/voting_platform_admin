import React from "react";
import { useSelector } from "react-redux";
import PositionLayout from "./positionCard";

function Overview() {
	let positions = useSelector((state) => state.position.positions);
	let candidates = useSelector((state) => state.candidate.candidates);
	let totalUsers = useSelector((state) => state.app.totalUsers);
	let usersVoted = useSelector((state) => state.app.usersVoted);

	let positionComponents = positions.map((position) => {
		return (
			<PositionLayout
				key={position.position_id}
				position={position}
				candidates={candidates}
			/>
		);
	});

	return (
		<div className=''>
			<div className='flex flex-col'>
				<div className='relative px-2 py-4 bg-gray-100 md:px-4'>
					<h2 className='text-2xl text-left underline'>
						Summary
					</h2>
				</div>
				<div className='px-2 md:px-4'>
					<p className='text-lg font-medium text-left'>
						Total number of voters in
						database:{" "}
						<span className='ml-2 text-2xl font-xl bold'>
							{totalUsers}
						</span>
					</p>
					<p className='text-lg font-medium text-left'>
						Total number of users voted:{" "}
						<span className='ml-2 text-2xl font-xl bold'>
							{usersVoted}
						</span>
					</p>
				</div>
			</div>
			<div className='divide-y'>{positionComponents}</div>
		</div>
	);
}

export default Overview;
