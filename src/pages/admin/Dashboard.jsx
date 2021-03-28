import React from "react";
import { Link } from "react-router-dom";
import { boxIcon, getIcon, person } from "../../components/common/icons";
import ActiveBoxList from "../../components/tables/ActiveBoxList";
import InactiveBoxList from "../../components/tables/InactiveBoxList";

const Dashboard = () => {
	const [showActiveBoxes, setShowActiveBoxes] = React.useState(true);

	return (
		<div>
			<header>
				<h1>Dashboard</h1>
			</header>
			{/* TODO Add graph view of boxes */}
			<div className="flex justify-end my-5 space-x-4">
				{/* Navigation */}
				<button
					className={`btn-${showActiveBoxes ? "info" : "warning"}`}
					onClick={() => setShowActiveBoxes(!showActiveBoxes)}
				>
					{showActiveBoxes ? "View Inactive" : "View Active"}
				</button>
				<Link to="/create_employee">
					<button className="btn-primary flex items-center">
						<p className="mr-2">Add Employees</p>
						{getIcon(person, 8)}
					</button>
				</Link>
				<Link to="/create">
					<button className="btn-primary flex items-center">
						<p className="mr-2">Create Box</p>
						{getIcon(boxIcon, 8)}
					</button>
				</Link>
			</div>
			<div className="grid grid-cols-2 space-x-2">
				<div>
					<h1
						className={`text-2xl font-bold text-center mb-6 bg-${
							showActiveBoxes ? "yellow-600" : "purple-700"
						}`}
					>
						{showActiveBoxes ? "Active" : "Inactive"} Barrels List
					</h1>
					{showActiveBoxes ? (
						<ActiveBoxList sortParams={["part_type", "Barrels"]} />
					) : (
						<InactiveBoxList
							sortParams={["part_type", "Barrels"]}
						/>
					)}
				</div>
				<div>
					<h1
						className={`text-2xl font-bold text-center mb-6 bg-${
							showActiveBoxes ? "yellow-600" : "purple-700"
						}`}
					>
						{showActiveBoxes ? "Active" : "Inactive"} Frames List
					</h1>
					{showActiveBoxes ? (
						<ActiveBoxList sortParams={["part_type", "Frames"]} />
					) : (
						<InactiveBoxList sortParams={["part_type", "Frames"]} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
