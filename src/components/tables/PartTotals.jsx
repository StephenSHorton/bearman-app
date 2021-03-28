import React from "react";

const PartTotals = ({ boxes, model }) => {
	const NOTSTARTED = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.status === 1 && box.model === model) {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};
	const INPROGRESS = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.status === 2 && box.model === model) {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};
	const INTERRUPTED = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.status === 3 && box.model === model) {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};
	const TOTAL = () => {
		let total = 0;
		boxes.forEach((box) => {
			if (box.model === model) {
				return (total += box.quantity);
			}
		});
		return <td className="p-2">{total}</td>;
	};

	return (
		<table className="w-full">
			<thead>
				<tr className="bg-transparent">
					<th className="text-left pl-1">{model} Parts</th>
				</tr>
				<tr className="bg-gray-600">
					<th>NOTSTARTED</th>
					<th>INPROGRESS</th>
					<th>INTERRUPTED</th>
					<th>TOTAL</th>
				</tr>
			</thead>
			<tbody>
				<tr className="text-center shadow-xl">
					<NOTSTARTED />
					<INPROGRESS />
					<INTERRUPTED />
					<TOTAL />
				</tr>
			</tbody>
		</table>
	);
};

export default PartTotals;
