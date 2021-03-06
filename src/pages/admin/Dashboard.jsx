import React from "react";
import { Link } from "react-router-dom";
import BoxList from "../../components/tables/BoxList";

const Dashboard = () => {
	return (
		<div>
			<header>
				<h1>Dashboard</h1>
			</header>
			<div className="flex justify-end mx-10 my-5">
				{/* Navigation */}
				<Link to="/create">
					<button className="btn-primary">Create New</button>
				</Link>
			</div>
			<div className="grid grid-cols-2">
				<BoxList sortParams={["partType", "Frames"]} />
				<BoxList sortParams={["partType", "Barrels"]} />
			</div>
		</div>
	);
};

export default Dashboard;
