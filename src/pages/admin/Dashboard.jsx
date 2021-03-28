import React from "react";
import { Link } from "react-router-dom";
import { boxIcon, getIcon } from "../../components/common/icons";
import ActiveBoxList from "../../components/tables/ActiveBoxList";

const Dashboard = () => {
	return (
		<div>
			<header>
				<h1>Dashboard</h1>
			</header>
			{/* TODO Add graph view of boxes */}
			<div className="flex justify-end mx-10 my-5">
				{/* Navigation */}
				<Link to="/create">
					<button className="btn-primary flex items-center">
						<p className="mr-2">Create New</p>
						{getIcon(boxIcon, 8)}
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-2 space-x-2">
				<div>
					<h1 className="text-2xl font-bold text-center mb-6 bg-gray-700">
						Active Barrels List
					</h1>
					<ActiveBoxList sortParams={["part_type", "Barrels"]} />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-center mb-6 bg-gray-700">
						Active Frames List
					</h1>
					<ActiveBoxList sortParams={["part_type", "Frames"]} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
