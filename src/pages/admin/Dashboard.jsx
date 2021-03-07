import React from "react";
import { Link } from "react-router-dom";
import { boxIcon } from "../../components/common/icons";
import ActiveBoxList from "../../components/tables/ActiveBoxList";

const Dashboard = () => {
	return (
		<div>
			<header>
				<h1>Dashboard</h1>
			</header>
			<div className="flex justify-end mx-10 my-5">
				{/* Navigation */}
				<Link to="/create">
					<button className="btn-primary flex">
						<p className="mr-2">Create New</p>
						{boxIcon}
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-2 justify-items-center">
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
