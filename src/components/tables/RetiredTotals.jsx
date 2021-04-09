import React from "react";

const RetiredTotals = ({ boxes }) => {
	const TOTALBBPARTS = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.model === "BB") {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};
	const TOTALCLPARTS = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.model === "CL") {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};

	return (
		<table className="w-full">
			<thead>
				<tr className="bg-transparent">
					<th className="text-left pl-1">Statistics</th>
				</tr>
				<tr className="bg-gray-600">
					<th>TOTAL BB PARTS</th>
					<th>TOTAL CL PARTS</th>
				</tr>
			</thead>
			<tbody>
				<tr className="text-center shadow-xl">
					<TOTALBBPARTS />
					<TOTALCLPARTS />
				</tr>
			</tbody>
		</table>
	);
};

export default RetiredTotals;
